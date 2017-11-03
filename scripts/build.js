// @flow
/* eslint-disable
    import/unambiguous,
    flowtype/require-return-type,
    flowtype/require-parameter-type,
    no-console,
    global-require
*/
const fs = require("fs");
const path = require("path");
const babel = require("babel-core");
const outputFileSync = require("output-file-sync");
const readdir = require("fs-readdir-recursive");
const rimraf = require("rimraf");
const config = require("./config.js");

const IgnoreTemplates = [/__tests__/, /\.stories.js$/];
const FilesToCopy = ["README.md", "CHANGELOG.md"];
const SrcPath = "src";

Promise.resolve()
    .then(() => build(SrcPath, FilesToCopy, config.retailUi))
    .then(() => build(SrcPath, FilesToCopy, config.reactUi))
    .then(() => {
        clearConsole();
        console.log("Build completed");
    });

function build(src, filesToCopy, config) {
    const outDirPath = path.join(process.cwd(), config.outDir);
    const folderPath = path.resolve(process.cwd(), src);
    return new Promise(resolve =>
        rimraf(outDirPath, () => {
            handle(folderPath, outDirPath, config.babel);
            generatePackageJson(config.name, config.peerDependencies, outDirPath);
            filesToCopy.forEach(copyFile(outDirPath));
            resolve();
        })
    );
}

function transform(filename, code, opts) {
    const result = babel.transform(code, {
        filename: filename,
        sourceMaps: true,
        sourceFileName: opts.sourceFileName,
        sourceMapTarget: opts.sourceMapTarget,
        plugins: opts.plugins,
        presets: opts.presets,
    });
    result.filename = filename;
    result.actual = code;
    return result;
}

function compile(filename, opts) {
    try {
        const code = fs.readFileSync(filename, "utf8");
        return transform(filename, code, opts);
    } catch (err) {
        throw err;
    }
}

function chmod(src, dest) {
    fs.chmodSync(dest, fs.statSync(src).mode);
}

function write(src, relative, outDir, config) {
    // remove extension and then append back on .js
    const relativeTrimed = `${relative.replace(/\.(\w*?)$/, "")}.js`;

    const dest = path.join(outDir, relativeTrimed);

    const data = compile(src, {
        sourceFileName: path.relative(`${dest}/..`, src),
        sourceMapTarget: path.basename(relativeTrimed),
        plugins: config.plugins,
        presets: config.presets,
    });

    outputFileSync(dest, data.code);
    outputFileSync(`${dest}.map`, JSON.stringify(data.map));
    chmod(src, dest);
    logTransform(src, dest);
}

function logTransform(src, dest) {
    clearConsole();
    console.log();
    console.log("Transformed:");
    console.log(`From: ${path.relative(process.cwd(), src)}`);
    console.log(`  To: ${path.relative(process.cwd(), dest)}`);
    console.log();
}

function shouldIgnore(loc) {
    return IgnoreTemplates.some(x => x.test(loc)) || babel.util.shouldIgnore(loc);
}

function handleFile(src, filename, outDir, config) {
    if (shouldIgnore(src)) {
        return;
    }

    if (babel.util.canCompile(filename)) {
        write(src, filename, outDir, config);
    } else {
        const dest = path.join(outDir, filename);
        outputFileSync(dest, fs.readFileSync(src));
        chmod(src, dest);
    }
}

function handle(filename, outDir, config) {
    if (!fs.existsSync(filename)) {
        return;
    }
    console.log(filename);
    const stat = fs.statSync(filename);

    if (stat.isDirectory()) {
        const dirname = path.join(filename);
        readdir(filename).forEach(filename => {
            const src = path.join(dirname, filename);
            handleFile(src, path.join(filename), outDir, config);
        });
    } else {
        write(filename, filename, outDir, config);
    }
}

function copyFile(outDir) {
    return fileName => {
        const pathName = path.join(process.cwd(), fileName);
        const content = fs.readFileSync(pathName);
        outputFileSync(path.join(outDir, fileName), content);
    };
}

function generatePackageJson(name, peerDeps, outDir) {
    const packageJson = require("../package.json");
    const result = {
        name: name,
        version: packageJson.version,
        main: "index.js",
        description: packageJson.description,
        license: "MIT",
        dependencies: packageJson.dependencies,
        peerDependencies: Object.assign({}, packageJson.peerDependencies, peerDeps),
    };
    const source = JSON.stringify(result, null, 2);
    outputFileSync(path.join(outDir, "package.json"), source);
}

function clearConsole() {
    process.stdout.write(process.platform === "win32" ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H");
}
