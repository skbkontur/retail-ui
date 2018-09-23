module.exports = {
    // ===============================
    // POSSIBLE ERRORS
    // ===============================

    // enforce "for" loop update clause moving the counter in the right direction.
    // http://eslint.org/docs/rules/for-direction
    "for-direction": "error",

    // enforce return statements in getters
    // http://eslint.org/docs/rules/getter-return
    "getter-return": "error",

    // disallow await inside of loops
    // http://eslint.org/docs/rules/no-await-in-loop
    "no-await-in-loop": "off",

    // disallow comparing against -0
    // http://eslint.org/docs/rules/no-compare-neg-zero
    "no-compare-neg-zero": "error",

    // disallow assignment operators in conditional expressions
    // http://eslint.org/docs/rules/no-cond-assign
    "no-cond-assign": "error",

    // disallow the use of console
    // http://eslint.org/docs/rules/no-console
    "no-console": ["error", { allow: ["error", "warn"] }],

    // disallow constant expressions in conditions
    // http://eslint.org/docs/rules/no-constant-condition
    "no-constant-condition": "off",

    // disallow control characters in regular expressions
    // http://eslint.org/docs/rules/no-control-regex
    "no-control-regex": "off",

    // disallow the use of debugger
    // http://eslint.org/docs/rules/no-debugger
    "no-debugger": "error",

    // disallow duplicate arguments in function definitions
    // http://eslint.org/docs/rules/no-dupe-args
    "no-dupe-args": "error",

    // disallow duplicate keys in object literals
    // http://eslint.org/docs/rules/no-dupe-keys
    "no-dupe-keys": "error",

    // disallow duplicate case labels
    // http://eslint.org/docs/rules/no-duplicate-case
    "no-duplicate-case": "error",

    // disallow empty block statements
    // http://eslint.org/docs/rules/no-empty
    "no-empty": "error",

    // disallow empty character classes in regular expressions
    // http://eslint.org/docs/rules/no-empty-character-class
    "no-empty-character-class": "error",

    // disallow reassigning exceptions in catch clauses
    // http://eslint.org/docs/rules/no-ex-assign
    "no-ex-assign": "error",

    // disallow unnecessary boolean casts
    // http://eslint.org/docs/rules/no-extra-boolean-cast
    "no-extra-boolean-cast": "error",

    // disallow unnecessary parentheses
    // http://eslint.org/docs/rules/no-extra-parens
    // off due prettier rules
    "no-extra-parens": "off",

    // disallow unnecessary semicolons
    // http://eslint.org/docs/rules/no-extra-semi
    // off due prettier rules
    "no-extra-semi": "off",

    // disallow reassigning function declarations
    // http://eslint.org/docs/rules/no-func-assign
    "no-func-assign": "off",

    // disallow variable or function declarations in nested blocks
    // http://eslint.org/docs/rules/no-inner-declarations
    "no-inner-declarations": "error",

    // disallow invalid regular expression strings in RegExp constructors
    // http://eslint.org/docs/rules/no-invalid-regexp
    "no-invalid-regexp": "error",

    // disallow irregular whitespace outside of strings and comments
    // http://eslint.org/docs/rules/no-irregular-whitespace
    "no-irregular-whitespace": "error",

    // disallow calling global object properties as functions
    // http://eslint.org/docs/rules/no-obj-calls
    "no-obj-calls": "error",

    // disallow calling some Object.prototype methods directly on objects
    // http://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "warn",

    // disallow multiple spaces in regular expressions
    // http://eslint.org/docs/rules/no-regex-spaces
    "no-regex-spaces": "error",

    // disallow sparse arrays
    // http://eslint.org/docs/rules/no-sparse-arrays
    "no-sparse-arrays": "error",

    // disallow template literal placeholder syntax in regular strings
    // http://eslint.org/docs/rules/no-template-curly-in-string
    "no-template-curly-in-string": "error",

    // disallow confusing multiline expressions
    // http://eslint.org/docs/rules/no-unexpected-multiline
    "no-unexpected-multiline": "error",

    // disallow unreachable code after return, throw, contin
    // http://eslint.org/docs/rules/no-unreachable
    "no-unreachable": "error",

    // disallow control flow statements in finally blocks
    // http://eslint.org/docs/rules/no-unsafe-finally
    "no-unsafe-finally": "error",

    // disallow negating the left operand of relational operators
    // http://eslint.org/docs/rules/no-unsafe-negation
    "no-unsafe-negation": "error",

    // require calls to isNaN() when checking for NaN
    // http://eslint.org/docs/rules/use-isnan
    "use-isnan": "error",

    // enforce valid JSDoc comments
    // http://eslint.org/docs/rules/valid-jsdoc
    "valid-jsdoc": "off",

    // enforce comparing typeof expressions against valid strings
    // http://eslint.org/docs/rules/valid-typeof
    "valid-typeof": "error",

    // =======================================
    // BEST PRACTICES
    // =======================================

    // enforce getter and setter pairs in objects
    // http://eslint.org/docs/rules/accessor-pairs
    "accessor-pairs": "off",

    // enforce return statements in callbacks of array methods
    // http://eslint.org/docs/rules/array-callback-return
    "array-callback-return": "off",

    // enforce the use of variables within the scope they are defined
    // http://eslint.org/docs/rules/block-scoped-var
    "block-scoped-var": "off",

    // enforce that class methods utilize this
    // http://eslint.org/docs/rules/class-methods-use-this
    "class-methods-use-this": "off",

    // enforce a maximum cyclomatic complexity allowed in a program
    // http://eslint.org/docs/rules/complexity
    complexity: "off",

    // require return statements to either always or never specify values
    // http://eslint.org/docs/rules/consistent-return
    "consistent-return": "error",

    // enforce consistent brace style for all control statements
    // http://eslint.org/docs/rules/curly
    curly: "off",

    // require default cases in switch statements
    // http://eslint.org/docs/rules/default-case
    "default-case": "error",

    // enforce consistent newlines before and after dots
    // http://eslint.org/docs/rules/dot-location
    // off due prettier rules
    "dot-location": "off",

    // enforce dot notation whenever possible
    // http://eslint.org/docs/rules/dot-notation
    "dot-notation": [
        "error",
        {
            allowKeywords: true,
        },
    ],

    // require the use of === and !==
    // http://eslint.org/docs/rules/eqeqeq
    eqeqeq: ["error", "always", { null: "ignore" }],

    // require for-in loops to include an if statement
    // http://eslint.org/docs/rules/guard-for-in
    "guard-for-in": "error",

    // disallow the use of alert, confirm, and prompt
    // http://eslint.org/docs/rules/no-alert
    "no-alert": "error",

    // disallow the use of arguments.caller or arguments.callee
    // http://eslint.org/docs/rules/no-caller
    "no-caller": "error",

    // disallow lexical declarations in case clauses
    // http://eslint.org/docs/rules/no-case-declarations
    "no-case-declarations": "error",

    // disallow division operators explicitly at the beginning of regular expressions
    // http://eslint.org/docs/rules/no-div-regex
    "no-div-regex": "error",

    // disallow else blocks after return statements in if</co
    // http://eslint.org/docs/rules/no-else-return
    "no-else-return": "error",

    // disallow empty functions
    // http://eslint.org/docs/rules/no-empty-function
    "no-empty-function": "warn",

    // disallow empty destructuring patterns
    // http://eslint.org/docs/rules/no-empty-pattern
    "no-empty-pattern": "error",

    // disallow null comparisons without type-checking operators
    // http://eslint.org/docs/rules/no-eq-null
    "no-eq-null": "off",

    // disallow the use of eval()
    // http://eslint.org/docs/rules/no-eval
    "no-eval": "error",

    // disallow extending native types
    // http://eslint.org/docs/rules/no-extend-native
    "no-extend-native": "error",

    // disallow unnecessary calls to .bind()
    // http://eslint.org/docs/rules/no-extra-bind
    "no-extra-bind": "error",

    // disallow unnecessary labels
    // http://eslint.org/docs/rules/no-extra-label
    "no-extra-label": "error",

    // disallow fallthrough of case statements
    // http://eslint.org/docs/rules/no-fallthrough
    "no-fallthrough": "error",

    // disallow leading or trailing decimal points in numeric literals
    // http://eslint.org/docs/rules/no-floating-decimal
    "no-floating-decimal": "error",

    // disallow assignments to native objects or read-only global variables
    // http://eslint.org/docs/rules/no-global-assign
    "no-global-assign": "error",

    // disallow shorthand type conversions
    // http://eslint.org/docs/rules/no-implicit-coercion
    "no-implicit-coercion": "off",

    // disallow variable and function declarations in the global scope
    // http://eslint.org/docs/rules/no-implicit-globals
    "no-implicit-globals": "error",

    // disallow the use of eval()-like methods
    // http://eslint.org/docs/rules/no-implied-eval
    "no-implied-eval": "error",

    // disallow this keywords outside of classes or class-like objects
    // http://eslint.org/docs/rules/no-invalid-this
    "no-invalid-this": "off",

    // disallow the use of the __iterator__ property
    // http://eslint.org/docs/rules/no-iterator
    "no-iterator": "error",

    // disallow labeled statements
    // http://eslint.org/docs/rules/no-labels
    "no-labels": "error",

    // disallow unnecessary nested blocks
    // http://eslint.org/docs/rules/no-lone-blocks
    "no-lone-blocks": "error",

    // disallow function declarations and expressions inside loop statements
    // http://eslint.org/docs/rules/no-loop-func
    "no-loop-func": "error",

    // disallow magic numbers
    // http://eslint.org/docs/rules/no-magic-numbers
    "no-magic-numbers": "off",

    // disallow multiple spaces
    // http://eslint.org/docs/rules/no-multi-spaces
    // off due prettier rules
    "no-multi-spaces": "off",

    // disallow multiline strings
    // http://eslint.org/docs/rules/no-multi-str
    "no-multi-str": "error",

    // disallow new operators outside of assignments or comparisons
    // http://eslint.org/docs/rules/no-new
    "no-new": "error",

    // disallow new operators with the Function object
    // http://eslint.org/docs/rules/no-new-func
    "no-new-func": "error",

    // disallow new operators with the String, Number</cod
    // http://eslint.org/docs/rules/no-new-wrappers
    "no-new-wrappers": "error",

    // disallow octal literals
    // http://eslint.org/docs/rules/no-octal
    "no-octal": "error",

    // disallow octal escape sequences in string literals
    // http://eslint.org/docs/rules/no-octal-escape
    "no-octal-escape": "error",

    // disallow reassigning function parameters
    // http://eslint.org/docs/rules/no-param-reassign
    "no-param-reassign": ["error", { props: false }],

    // disallow the use of the __proto__ property
    // http://eslint.org/docs/rules/no-proto
    "no-proto": "error",

    // disallow variable redeclaration
    // http://eslint.org/docs/rules/no-redeclare
    "no-redeclare": "error",

    // disallow certain properties on certain objects
    // http://eslint.org/docs/rules/no-restricted-properties
    "no-restricted-properties": "error",

    // disallow assignment operators in return statements
    // http://eslint.org/docs/rules/no-return-assign
    "no-return-assign": "error",

    // disallow unnecessary return await
    // http://eslint.org/docs/rules/no-return-await
    "no-return-await": "warn",

    // disallow javascript: urls
    // http://eslint.org/docs/rules/no-script-url
    "no-script-url": "error",

    // disallow assignments where both sides are exactly the same
    // http://eslint.org/docs/rules/no-self-assign
    "no-self-assign": "error",

    // disallow comparisons where both sides are exactly the same
    // http://eslint.org/docs/rules/no-self-compare
    "no-self-compare": "error",

    // disallow comma operators
    // http://eslint.org/docs/rules/no-sequences
    "no-sequences": "error",

    // disallow throwing literals as exceptions
    // http://eslint.org/docs/rules/no-throw-literal
    "no-throw-literal": "error",

    // disallow unmodified loop conditions
    // http://eslint.org/docs/rules/no-unmodified-loop-condition
    "no-unmodified-loop-condition": "error",

    // disallow unused expressions
    // http://eslint.org/docs/rules/no-unused-expressions
    "no-unused-expressions": "off",

    // disallow unused labels
    // http://eslint.org/docs/rules/no-unused-labels
    "no-unused-labels": "error",

    // disallow unnecessary calls to .call() and .apply()
    // http://eslint.org/docs/rules/no-useless-call
    "no-useless-call": "error",

    // disallow unnecessary concatenation of literals or template literals
    // http://eslint.org/docs/rules/no-useless-concat
    "no-useless-concat": "warn",

    // disallow unnecessary escape characters
    // http://eslint.org/docs/rules/no-useless-escape
    "no-useless-escape": "warn",

    // disallow redundant return statements
    // http://eslint.org/docs/rules/no-useless-return
    "no-useless-return": "error",

    // disallow void operators
    // http://eslint.org/docs/rules/no-void
    "no-void": "off",

    // disallow specified warning terms in comments
    // http://eslint.org/docs/rules/no-warning-comments
    "no-warning-comments": ["warn", { terms: ["todo", "fixme"], location: "start" }],

    // disallow with statements
    // http://eslint.org/docs/rules/no-with
    "no-with": "error",

    // require using Error objects as Promise rejection reasons
    // http://eslint.org/docs/rules/prefer-promise-reject-errors
    "prefer-promise-reject-errors": "error",

    // enforce the consistent use of the radix argument when using parseInt()
    // http://eslint.org/docs/rules/radix
    radix: "error",

    // disallow async functions which have no await expression
    // http://eslint.org/docs/rules/require-await
    "require-await": "warn",

    // require var declarations be placed at the top of their containing scope
    // http://eslint.org/docs/rules/vars-on-top
    "vars-on-top": "error",

    // require parentheses around immediate function invocations
    // http://eslint.org/docs/rules/wrap-iife
    // off due prettier rules
    "wrap-iife": "off",

    // require or disallow "Yoda" conditions
    // http://eslint.org/docs/rules/yoda
    yoda: ["error", "never"],

    // =================================
    // STRICT MODE
    // =================================

    // require or disallow strict mode directives
    // http://eslint.org/docs/rules/strict
    strict: "off",

    // =================================
    // VARIABLES
    // =================================

    // require or disallow initialization in variable declarations
    // http://eslint.org/docs/rules/init-declarations
    "init-declarations": "off",

    // disallow catch clause parameters from shadowing variables in the outer scope
    // http://eslint.org/docs/rules/no-catch-shadow
    "no-catch-shadow": "error",

    // disallow deleting variables
    // http://eslint.org/docs/rules/no-delete-var
    "no-delete-var": "error",

    // disallow labels that share a name with a variable
    // http://eslint.org/docs/rules/no-label-var
    "no-label-var": "error",

    // disallow specified global variables
    // http://eslint.org/docs/rules/no-restricted-globals
    "no-restricted-globals": "error",

    // disallow variable declarations from shadowing variables declared in the outer scope
    // http://eslint.org/docs/rules/no-shadow
    "no-shadow": "off",

    // disallow identifiers from shadowing restricted names
    // http://eslint.org/docs/rules/no-shadow-restricted-names
    "no-shadow-restricted-names": "error",

    // disallow the use of undeclared variables unless mentioned in /*global */ comments
    // http://eslint.org/docs/rules/no-undef
    "no-undef": "error",

    // disallow initializing variables to undefined
    // http://eslint.org/docs/rules/no-undef-init
    "no-undef-init": "error",

    // disallow the use of undefined as an identifier
    // http://eslint.org/docs/rules/no-undefined
    "no-undefined": "warn",

    // disallow unused variables
    // http://eslint.org/docs/rules/no-unused-vars
    "no-unused-vars": [
        "error",
        {
            // checks only that locally-declared variables are used but will allow
            // global variables to be unused
            vars: "local",
            // only the last argument must be used
            args: "after-used",
            // not to check arguments usega whose names starts with _
            argsIgnorePattern: "^_",
        },
    ],

    // disallow the use of variables before they are defined
    // http://eslint.org/docs/rules/no-use-before-define
    "no-use-before-define": "off",

    // =====================================
    // NODE.JS AND COMMONJS
    // =====================================

    // require return statements after callbacks
    // http://eslint.org/docs/rules/callback-return
    "callback-return": "warn",

    // require require() calls to be placed at top-level module scope
    // http://eslint.org/docs/rules/global-require
    "global-require": "error",

    // require error handling in callbacks
    // http://eslint.org/docs/rules/handle-callback-err
    "handle-callback-err": "off",

    // disallow use of the Buffer() constructor
    // http://eslint.org/docs/rules/no-buffer-constructor
    "no-buffer-constructor": "off",

    // disallow require calls to be mixed with regular variable declarations
    // http://eslint.org/docs/rules/no-mixed-requires
    "no-mixed-requires": "off",

    // disallow new operators with calls to require
    // http://eslint.org/docs/rules/no-new-require
    "no-new-require": "off",

    // disallow string concatenation with __dirname and __filename
    // http://eslint.org/docs/rules/no-path-concat
    "no-path-concat": "off",

    // disallow the use of process.env
    // http://eslint.org/docs/rules/no-process-env
    "no-process-env": "off",

    // disallow the use of process.exit()
    // http://eslint.org/docs/rules/no-process-exit
    "no-process-exit": "off",

    // disallow specified modules when loaded by require
    // http://eslint.org/docs/rules/no-restricted-modules
    "no-restricted-modules": "off",

    // disallow synchronous methods
    // http://eslint.org/docs/rules/no-sync
    "no-sync": "off",

    // ===============================================
    // STYLISTIC ISSUES
    // ===============================================

    // enforce linebreaks after opening and before closing array brackets
    // http://eslint.org/docs/rules/array-bracket-newline
    // off due prettier rules
    "array-bracket-newline": "off",

    // enforce consistent spacing inside array brackets
    // http://eslint.org/docs/rules/array-bracket-spacing
    // off due prettier rules
    "array-bracket-spacing": "off",

    // enforce line breaks after each array element
    // http://eslint.org/docs/rules/array-element-newline
    // off due prettier rules
    "array-element-newline": "off",

    // enforce consistent spacing inside single-line blocks
    // http://eslint.org/docs/rules/block-spacing
    // off due prettier rules
    "block-spacing": "off",

    // enforce consistent brace style for blocks
    // http://eslint.org/docs/rules/brace-style
    // off due prettier rules
    "brace-style": "off",

    // enforce camelcase naming convention
    // http://eslint.org/docs/rules/camelcase
    camelcase: "off",

    // enforce or disallow capitalization of the first letter of a comment
    // http://eslint.org/docs/rules/capitalized-comments
    "capitalized-comments": "off",

    // require or disallow trailing commas
    // http://eslint.org/docs/rules/comma-dangle
    // off due prettier rules
    "comma-dangle": "off",

    // enforce consistent spacing before and after commas
    // http://eslint.org/docs/rules/comma-spacing
    // off due prettier rules
    "comma-spacing": "off",

    // enforce consistent comma style
    // http://eslint.org/docs/rules/comma-style
    // off due prettier rules
    "comma-style": "off",

    // enforce consistent spacing inside computed property brackets
    // http://eslint.org/docs/rules/computed-property-spacing
    // off due prettier rules
    "computed-property-spacing": "off",

    // enforce consistent naming when capturing the current execution context
    // http://eslint.org/docs/rules/consistent-this
    "consistent-this": "warn",

    // require or disallow newline at the end of files
    // http://eslint.org/docs/rules/eol-last
    // off due prettier rules
    "eol-last": "off",

    // require or disallow spacing between function identifiers and their invocations
    // http://eslint.org/docs/rules/func-call-spacing
    // off due prettier rules
    "func-call-spacing": "off",

    // require function names to match the name of the variable or property to which they are assigned
    // http://eslint.org/docs/rules/func-name-matching
    "func-name-matching": ["warn", "always"],

    // require or disallow named function expressions
    // http://eslint.org/docs/rules/func-names
    "func-names": "off",

    // enforce the consistent use of either function declarations or expressions
    // http://eslint.org/docs/rules/func-style
    "func-style": ["warn", "declaration"],

    // disallow specified identifiers
    // http://eslint.org/docs/rules/id-blacklist
    "id-blacklist": "off",

    // enforce minimum and maximum identifier lengths
    // http://eslint.org/docs/rules/id-length
    "id-length": [
        "error",
        {
            min: 2,
            exceptions: ["i", "j", "x", "y", "z", "f", "_", "e"],
        },
    ],

    // require identifiers to match a specified regular expression
    // http://eslint.org/docs/rules/id-match
    "id-match": "off",

    // enforce consistent indentation
    // http://eslint.org/docs/rules/indent
    // off due prettier rules
    indent: "off",

    // enforce the consistent use of either double or single quotes in JSX attributes
    // http://eslint.org/docs/rules/jsx-quotes
    // off due prettier rules
    "jsx-quotes": "off",


    // Enforce spacing around the * in generator functions
    // https://eslint.org/docs/rules/generator-star-spacing
    "generator-star-spacing": "error",

    // enforce consistent spacing between keys and values in object literal properties
    // http://eslint.org/docs/rules/key-spacing
    // off due prettier rules
    "key-spacing": "off",

    // enforce consistent spacing before and after keywords
    // http://eslint.org/docs/rules/keyword-spacing
    // off due prettier rules
    "keyword-spacing": "off",

    // enforce position of line comments
    // http://eslint.org/docs/rules/line-comment-position
    "line-comment-position": "off",

    // enforce consistent linebreak style
    // http://eslint.org/docs/rules/linebreak-style
    "linebreak-style": ["error", "unix"],

    // require empty lines around comments
    // http://eslint.org/docs/rules/lines-around-comment
    "lines-around-comment": "off",

    // require or disallow an empty line between class members
    // https://eslint.org/docs/rules/lines-between-class-members
    // TODO хорошо бы завести
    "lines-between-class-members": "off",

    // enforce a maximum depth that blocks can be nested
    // http://eslint.org/docs/rules/max-depth
    "max-depth": ["error", 4],

    // enforce a maximum line length
    // http://eslint.org/docs/rules/max-len
    "max-len": "off",

    // enforce a maximum number of lines per file
    // http://eslint.org/docs/rules/max-lines
    "max-lines": "off",

    // enforce a maximum depth that callbacks can be nested
    // http://eslint.org/docs/rules/max-nested-callbacks
    "max-nested-callbacks": ["error", 4],

    // enforce a maximum number of parameters in function definitions
    // http://eslint.org/docs/rules/max-params
    "max-params": ["error", 4],

    // enforce a maximum number of statements allowed in function blocks
    // http://eslint.org/docs/rules/max-statements
    "max-statements": ["error", 40],

    // enforce a maximum number of statements allowed per line
    // http://eslint.org/docs/rules/max-statements-per-line
    "max-statements-per-line": ["error", { max: 1 }],

    // enforce newlines between operands of ternary expressions
    // http://eslint.org/docs/rules/multiline-ternary
    // off due prettier rules
    "multiline-ternary": "off",

    // require constructor names to begin with a capital letter
    // http://eslint.org/docs/rules/new-cap
    "new-cap": [
        "error",
        {
            newIsCap: true,
            capIsNew: false,
        },
    ],

    // require parentheses when invoking a constructor with no arguments
    // http://eslint.org/docs/rules/new-parens
    // off due prettier rules
    "new-parens": "off",

    // require a newline after each call in a method chain
    // http://eslint.org/docs/rules/newline-per-chained-call
    // off due prettier rules
    "newline-per-chained-call": "off",

    // disallow Array constructors
    // http://eslint.org/docs/rules/no-array-constructor
    "no-array-constructor": "error",

    // disallow bitwise operators
    // http://eslint.org/docs/rules/no-bitwise
    "no-bitwise": "warn",

    // disallow continue statements
    // http://eslint.org/docs/rules/no-continue
    "no-continue": "off",

    // disallow inline comments after code
    // http://eslint.org/docs/rules/no-inline-comments
    "no-inline-comments": "off",

    // disallow if statements as the only statement in else blocks
    // http://eslint.org/docs/rules/no-lonely-if
    "no-lonely-if": "error",

    // disallow mixed binary operators
    // http://eslint.org/docs/rules/no-mixed-operators
    // off due prettier rules
    "no-mixed-operators": "off",

    // disallow mixed spaces and tabs for indentation
    // http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    // off due prettier rules
    "no-mixed-spaces-and-tabs": "off",

    // disallow use of chained assignment expressions
    // http://eslint.org/docs/rules/no-multi-assign
    "no-multi-assign": "error",

    // disallow multiple empty lines
    // http://eslint.org/docs/rules/no-multiple-empty-lines
    // off due prettier rules
    "no-multiple-empty-lines": "off",

    // disallow negated conditions
    // http://eslint.org/docs/rules/no-negated-condition
    "no-negated-condition": "off",

    // disallow nested ternary expressions
    // http://eslint.org/docs/rules/no-nested-ternary
    "no-nested-ternary": "error",

    // disallow Object constructors
    // http://eslint.org/docs/rules/no-new-object
    "no-new-object": "error",

    // disallow the unary operators ++ and --
    // http://eslint.org/docs/rules/no-plusplus
    "no-plusplus": "off",

    // disallow specified syntax
    // http://eslint.org/docs/rules/no-restricted-syntax
    "no-restricted-syntax": "off",

    // disallow all tabs
    // http://eslint.org/docs/rules/no-tabs
    // off due prettier rules
    "no-tabs": "off",

    // disallow ternary operators
    // http://eslint.org/docs/rules/no-ternary
    "no-ternary": "off",

    // disallow trailing whitespace at the end of lines
    // http://eslint.org/docs/rules/no-trailing-spaces
    // off due prettier rules
    "no-trailing-spaces": "off",

    // disallow dangling underscores in identifiers
    // http://eslint.org/docs/rules/no-underscore-dangle
    "no-underscore-dangle": ["warn", { allow: ["_1CXml"] }],

    // disallow ternary operators when simpler alternatives exist
    // http://eslint.org/docs/rules/no-unneeded-ternary
    "no-unneeded-ternary": "error",

    // disallow whitespace before properties
    // http://eslint.org/docs/rules/no-whitespace-before-property
    // off due prettier rules
    "no-whitespace-before-property": "off",

    // enforce the location of single-line statements
    // http://eslint.org/docs/rules/nonblock-statement-body-position
    // off due prettier rules
    "nonblock-statement-body-position": "off",

    // enforce consistent line breaks inside braces
    // http://eslint.org/docs/rules/object-curly-newline
    // off due prettier rules
    "object-curly-newline": "off",

    // enforce consistent spacing inside braces
    // http://eslint.org/docs/rules/object-curly-spacing
    // off due prettier rules
    "object-curly-spacing": "off",

    // enforce placing object properties on separate lines
    // http://eslint.org/docs/rules/object-property-newline
    // off due prettier rules
    "object-property-newline": "off",

    // enforce variables to be declared either together or separately in functions
    // http://eslint.org/docs/rules/one-var
    "one-var": ["warn", "never"],

    // require or disallow newlines around variable declarations
    // http://eslint.org/docs/rules/one-var-declaration-per-line
    // off due prettier rules
    "one-var-declaration-per-line": "off",

    // require or disallow assignment operator shorthand where possible
    // http://eslint.org/docs/rules/operator-assignment
    "operator-assignment": ["error", "always"],

    // enforce consistent linebreak style for operators
    // http://eslint.org/docs/rules/operator-linebreak
    // off due prettier rules
    "operator-linebreak": "off",

    // require or disallow padding within blocks
    // http://eslint.org/docs/rules/padded-blocks
    // off due prettier rules
    "padded-blocks": "off",

    // require or disallow padding lines between statements
    // http://eslint.org/docs/rules/padding-line-between-statements
    "padding-line-between-statements": "off",

    // require quotes around object literal property names
    // http://eslint.org/docs/rules/quote-props
    // off due prettier rules
    "quote-props": "off",

    // enforce the consistent use of either backticks, double, or single quotes
    // http://eslint.org/docs/rules/quotes
    // off due prettier rules
    quotes: "off",

    // require JSDoc comments
    // http://eslint.org/docs/rules/require-jsdoc
    "require-jsdoc": "off",

    // require or disallow semicolons instead of ASI
    // http://eslint.org/docs/rules/semi
    // off due prettier rules
    semi: "off",

    // enforce consistent spacing before and after semicolons
    // http://eslint.org/docs/rules/semi-spacing
    // off due prettier rules
    "semi-spacing": "off",

    // enforce location of semicolons
    // http://eslint.org/docs/rules/semi-style
    // off due prettier rules
    "semi-style": "off",

    // require object keys to be sorted
    // http://eslint.org/docs/rules/sort-keys
    "sort-keys": "off",

    // require variables within the same declaration block to be sorted
    // http://eslint.org/docs/rules/sort-vars
    "sort-vars": "off",

    // enforce consistent spacing before blocks
    // http://eslint.org/docs/rules/space-before-blocks
    // off due prettier rules
    "space-before-blocks": "off",

    // enforce consistent spacing before function definition opening parenthesis
    // http://eslint.org/docs/rules/space-before-function-paren
    // off due prettier rules
    "space-before-function-paren": "off",

    // enforce consistent spacing inside parentheses
    // http://eslint.org/docs/rules/space-in-parens
    // off due prettier rules
    "space-in-parens": "off",

    // require spacing around infix operators
    // http://eslint.org/docs/rules/space-infix-ops
    // off due prettier rules
    "space-infix-ops": "off",

    // enforce consistent spacing before or after unary operators
    // http://eslint.org/docs/rules/space-unary-ops
    // off due prettier rules
    "space-unary-ops": "off",

    // enforce consistent spacing after the // or /* in a comment
    // http://eslint.org/docs/rules/spaced-comment
    "spaced-comment": "off",

    // enforce spacing around colons of switch statements
    // http://eslint.org/docs/rules/switch-colon-spacing
    // off due prettier rules
    "switch-colon-spacing": "off",

    // require or disallow spacing between template tags and their literals
    // http://eslint.org/docs/rules/template-tag-spacing
    // off due prettier rules
    "template-tag-spacing": "off",

    // require or disallow Unicode byte order mark (BOM)
    // http://eslint.org/docs/rules/unicode-bom
    // off due prettier rules
    "unicode-bom": "off",

    // require parenthesis around regex literals
    // http://eslint.org/docs/rules/wrap-regex
    // off due prettier rules
    "wrap-regex": "off",

    // ===================================
    // ECMASCRIPT 6
    // ===================================

    // require braces around arrow function bodies
    // http://eslint.org/docs/rules/arrow-body-style
    "arrow-body-style": ["warn", "as-needed", { requireReturnForObjectLiteral: false }],

    // require parentheses around arrow function arguments
    // http://eslint.org/docs/rules/arrow-parens
    // off due prettier rules
    "arrow-parens": "off",

    // enforce consistent spacing before and after the arrow in arrow functions
    // http://eslint.org/docs/rules/arrow-spacing
    // off due prettier rules
    "arrow-spacing": "off",

    // require super() calls in constructors
    // http://eslint.org/docs/rules/constructor-super
    "constructor-super": "error",

    // enforce consistent spacing around * operators in generator functions
    // http://eslint.org/docs/rules/generator-star-spacing
    // off due prettier rules
    "generator-star-spacing": "off",

    // disallow reassigning class members
    // http://eslint.org/docs/rules/no-class-assign
    "no-class-assign": "error",

    // disallow arrow functions where they could be confused with comparisons
    // http://eslint.org/docs/rules/no-confusing-arrow
    // off due prettier rules
    "no-confusing-arrow": "off",

    // disallow reassigning const variables
    // http://eslint.org/docs/rules/no-const-assign
    "no-const-assign": "error",

    // disallow duplicate class members
    // http://eslint.org/docs/rules/no-dupe-class-members
    "no-dupe-class-members": "error",

    // disallow duplicate module imports
    // http://eslint.org/docs/rules/no-duplicate-imports
    // TODO починить, чтобы работало с flow
    "no-duplicate-imports": "off",

    // disallow new operators with the Symbol object
    // http://eslint.org/docs/rules/no-new-symbol
    "no-new-symbol": "error",

    // disallow specified modules when loaded by import
    // http://eslint.org/docs/rules/no-restricted-imports
    "no-restricted-imports": "off",

    // disallow this/super before calling super()
    // http://eslint.org/docs/rules/no-this-before-super
    "no-this-before-super": "error",

    // disallow unnecessary computed property keys in object literals
    // http://eslint.org/docs/rules/no-useless-computed-key
    "no-useless-computed-key": "warn",

    // disallow unnecessary constructors
    // http://eslint.org/docs/rules/no-useless-constructor
    "no-useless-constructor": "off",

    // disallow renaming import, export, and destructured assignments to the same name
    // http://eslint.org/docs/rules/no-useless-rename
    "no-useless-rename": "error",

    // require let or const instead of var
    // http://eslint.org/docs/rules/no-var
    "no-var": "error",

    // require or disallow method and property shorthand syntax for object literals
    // http://eslint.org/docs/rules/object-shorthand
    "object-shorthand": ["warn", "never"],

    // require arrow functions as callbacks
    // http://eslint.org/docs/rules/prefer-arrow-callback
    "prefer-arrow-callback": "error",

    // require const declarations for variables that are never reassigned after declared
    // http://eslint.org/docs/rules/prefer-const
    "prefer-const": "error",

    // require destructuring from arrays and/or objects
    // http://eslint.org/docs/rules/prefer-destructuring
    "prefer-destructuring": "off",

    // disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadeci
    // http://eslint.org/docs/rules/prefer-numeric-literals
    "prefer-numeric-literals": "error",

    // require rest parameters instead of arguments
    // http://eslint.org/docs/rules/prefer-rest-params
    "prefer-rest-params": "error",

    // require spread operators instead of .apply()
    // http://eslint.org/docs/rules/prefer-spread
    "prefer-spread": "error",

    // require template literals instead of string concatenation
    // http://eslint.org/docs/rules/prefer-template
    "prefer-template": "warn",

    // require generator functions to contain yield
    // http://eslint.org/docs/rules/require-yield
    "require-yield": "warn",

    // enforce spacing between rest and spread operators and their expressions
    // http://eslint.org/docs/rules/rest-spread-spacing
    // off due prettier rules
    "rest-spread-spacing": "off",

    // enforce sorted import declarations within modules
    // http://eslint.org/docs/rules/sort-imports
    "sort-imports": "off",

    // require symbol descriptions
    // http://eslint.org/docs/rules/symbol-description
    "symbol-description": "error",

    // require or disallow spacing around embedded expressions of template strings
    // http://eslint.org/docs/rules/template-curly-spacing
    // off due prettier rules
    "template-curly-spacing": "off",

    // require or disallow spacing around the * in yield* expressions
    // http://eslint.org/docs/rules/yield-star-spacing
    // off due prettier rules
    "yield-star-spacing": "off",

    // ================================
    // FLOW
    // ================================

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-boolean-style
    "flowtype/boolean-style": ["error", "boolean"],

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-define-flow-type
    "flowtype/define-flow-type": "error",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-delimiter-dangle
    // off due prettier rules
    "flowtype/delimiter-dangle": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-generic-spacing
    // off due prettier rules
    "flowtype/generic-spacing": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-dupe-keys
    "flowtype/no-dupe-keys": "error",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-primitive-constructor-types
    "flowtype/no-primitive-constructor-types": "error",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-types-missing-file-annotation
    "flowtype/no-types-missing-file-annotation": "warn",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-weak-types
    "flowtype/no-weak-types": ["error", { any: false }],

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-object-type-delimiter
    // off due prettier rules
    "flowtype/object-type-delimiter": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-require-parameter-type
    "flowtype/require-parameter-type": ["error", { excludeArrowFunctions: true }],

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-require-return-type
    "flowtype/require-return-type": ["error", "always", { excludeArrowFunctions: true }],

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-require-valid-file-annotation
    "flowtype/require-valid-file-annotation": ["error", "always", { annotationStyle: "line" }],

    // Requires that all variable declarators have type annotations.
    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-require-variable-type
    "flowtype/require-variable-type": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-semi
    // off due prettier rules
    "flowtype/semi": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-sort-keys
    "flowtype/sort-keys": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-space-after-type-colon
    // off due prettier rules
    "flowtype/space-after-type-colon": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-space-before-generic-bracket
    // off due prettier rules
    "flowtype/space-before-generic-bracket": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-space-before-type-colon
    // off due prettier rules
    "flowtype/space-before-type-colon": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-type-id-match
    "flowtype/type-id-match": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-union-intersection-spacing
    // off due prettier rules
    "flowtype/union-intersection-spacing": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-use-flow-type
    "flowtype/use-flow-type": "off",

    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-valid-syntax
    // Deprecated
    "flowtype/valid-syntax": "off",

    // =====================================
    // REACT
    // =====================================

    // Enforces consistent naming for boolean props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
    "react/boolean-prop-naming": "off",

    // Prevent extraneous defaultProps on components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
    "react/default-props-match-prop-types": ["warn", { "allowRequiredDefaults": true }],

    // Prevent missing <code>displayName</code> in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
    "react/display-name": [
        "error",
        {
            ignoreTranspilerName: false,
        },
    ],

    // Forbid certain props on Components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
    "react/forbid-component-props": "off",

    // Forbid certain elements
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-elements.md
    "react/forbid-elements": "off",

    // Forbid certain propTypes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    "react/forbid-prop-types": "off",

    // Forbid foreign propTypes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
    "react/forbid-foreign-prop-types": "off",

    // Prevent using Array index in <code>key</code> props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    "react/no-array-index-key": "off",

    // Prevent passing children as props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
    "react/no-children-prop": "error",

    // Prevent usage of dangerous JSX properties
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    "react/no-danger": "error",

    // Prevent problem with children and props.dangerouslySetInnerHTML
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
    "react/no-danger-with-children": "error",

    // Prevent usage of deprecated methods
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
    "react/no-deprecated": "warn",

    // Prevent usage of <code>setState</code> in <code>componentDidMount</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    "react/no-did-mount-set-state": ["error", "disallow-in-func"],

    // Prevent usage of <code>setState</code> in <code>componentDidUpdate</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    "react/no-did-update-set-state": ["error", "disallow-in-func"],

    // Prevent direct mutation of <code>this.state</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
    "react/no-direct-mutation-state": "error",

    // Prevent usage of <code>findDOMNode</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
    "react/no-find-dom-node": "off",

    // Prevent usage of <code>isMounted</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
    "react/no-is-mounted": "error",

    // Prevent multiple component definition per file
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
    "react/no-multi-comp": ["error", { ignoreStateless: true }],

    // Prevent usage of <code>shouldComponentUpdate</code> when extending React.PureComponent
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
    "react/no-redundant-should-component-update": "error",

    // Prevent usage of the return value of <code>React.render</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
    "react/no-render-return-value": "off",

    // Prevent usage of <code>setState</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
    "react/no-set-state": "off",

    // Prevent common casing typos
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
    // TODO почему-то не работает, удалить, если что.
    "react/no-typos": "off",

    // Prevent using string references in <code>ref</code> attribute.
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    "react/no-string-refs": "off",

    // Prevent invalid characters from appearing in markup
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    "react/no-unescaped-entities": "error",

    // Prevent usage of unknown DOM property (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    "react/no-unknown-property": "error",

    // Prevent definitions of unused prop types
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    // TODO Надо бы завести
    "react/no-unused-prop-types": "off",

    // Prevent usage of <code>setState</code> in <code>componentWillUpdate</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
    "react/no-will-update-set-state": "error",

    // Enforce ES5 or ES6 class for React Components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
    "react/prefer-es6-class": "error",

    // Enforce stateless React Components to be written as a pure function
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    "react/prefer-stateless-function": "off",

    // Prevent missing props validation in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    "react/prop-types": [
        "error",
        {
            ignore: ["className"],
        },
    ],

    // Prevent missing <code>React</code> when using JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    "react/react-in-jsx-scope": "error",

    // Enforce a defaultProps definition for every prop that is not a required prop
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    "react/require-default-props": "off",

    // Enforce React components to have a <code>shouldComponentUpdate</code> method
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
    "react/require-optimization": "off",

    // Enforce ES5 or ES6 class for returning value in render function
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
    "react/require-render-return": "error",

    // Prevent extra closing tags for components without children (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    "react/self-closing-comp": "error",

    // Enforce component methods order
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    // TODO надо бы завести
    "react/sort-comp": "off",

    // Enforce propTypes declarations alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
    "react/sort-prop-types": "off",

    // Enforce style prop value being an object
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
    "react/style-prop-object": "off",

    // Prevent void DOM elements (e.g. <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>) from receiving children
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    "react/void-dom-elements-no-children": "error",

    // Enforce boolean attributes notation in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    "react/jsx-boolean-value": "off",

    // Validate closing bracket location in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    // off due prettier rules
    "react/jsx-closing-bracket-location": "off",

    // Validate closing tag location in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
    // off due prettier rules
    "react/jsx-closing-tag-location": "off",

    // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    // off due prettier rules
    "react/jsx-curly-spacing": "off",

    // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
    // off due prettier rules
    "react/jsx-equals-spacing": "off",

    // Restrict file extensions that may contain JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    "react/jsx-filename-extension": "off",

    // Enforce position of the first prop in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    // off due prettier rules
    "react/jsx-first-prop-new-line": "off",

    // Enforce event handler naming conventions in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    "react/jsx-handler-names": "warn",

    // Validate JSX indentation (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    // off due prettier rules
    "react/jsx-indent": "off",

    // Validate props indentation in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    // off due prettier rules
    "react/jsx-indent-props": "off",

    // Validate JSX has key prop when in array or iterator
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    "react/jsx-key": "warn",

    // Limit maximum of props on a single line in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    // off due prettier rules
    "react/jsx-max-props-per-line": "off",

    // Prevent usage of <code>.bind()</code> and arrow functions in JSX props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],

    // Prevent comments from being inserted as text nodes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
    "react/jsx-no-comment-textnodes": "error",

    // Prevent duplicate props in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    "react/jsx-no-duplicate-props": "error",

    // Prevent usage of unwrapped JSX strings
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
    "react/jsx-no-literals": "off",

    // Prevent usage of unsafe <code>target='_blank'</code>
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    "react/jsx-no-target-blank": "off",

    // Disallow undeclared variables in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
    "react/jsx-no-undef": "error",

    // Enforce PascalCase for user-defined JSX components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    "react/jsx-pascal-case": "error",

    // Enforce props alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    "react/jsx-sort-props": "off",

    // Validate spacing before closing bracket in JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md
    // off due prettier rules
    "react/jsx-space-before-closing": "off",

    // Validate whitespace in and around the JSX opening and closing brackets (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    // off due prettier rules
    "react/jsx-tag-spacing": "off",

    // Prevent React to be incorrectly marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
    "react/jsx-uses-react": "error",

    // Prevent variables used in JSX to be incorrectly marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
    "react/jsx-uses-vars": "error",

    // Prevent missing parentheses around multilines JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    // off due prettier rules
    "react/jsx-wrap-multilines": "off",

    // ==================================
    // STATIC ANALYSIS
    // ==================================

    // Ensure imports point to a file/module that can be resolved.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    // TODO надо бы завести, чё-то работает плохо
    "import/no-unresolved": "off",

    // Ensure named imports correspond to a named export in the remote file.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
    // TODO Так то включить надо, на требует настройка
    "import/named": "off",

    // Ensure a default export is present, given a default import.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
    "import/default": "off",

    // Ensure imported namespaces contain dereferenced properties as they are dereferenced.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
    "import/namespace": "off",

    // Restrict which files can be imported in a given folder
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md
    "import/no-restricted-paths": "off",

    // Forbid import of modules using absolute paths
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    "import/no-absolute-path": "off",

    // Forbid <code>require()</code> calls with expressions
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    "import/no-dynamic-require": "error",

    // Prevent importing the submodules of other modules
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md
    "import/no-internal-modules": "off",

    // Forbid Webpack loader syntax in imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
    "import/no-webpack-loader-syntax": "off",

    // ==================================
    // HELPFUL WARNINGS
    // ==================================

    // Report any invalid exports, i.e. re-export of the same name
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
    "import/export": "error",

    // Report use of exported name as identifier of default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    "import/no-named-as-default": "off",

    // Report use of exported name as property of default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    "import/no-named-as-default-member": "off",

    // Report imported names marked with <code>@deprecated</code> documentation tag
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
    "import/no-deprecated": "error",

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // TODO избавиться от local_modules и включить или разобраться как работает
    "import/no-extraneous-dependencies": "off",

    // Forbid the use of mutable exports with <code>var</code> or <code>let</code>.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    "import/no-mutable-exports": "error",

    // ==================================
    // MODULE SYSTEMS
    // ==================================

    // Report potentially ambiguous parse goal (<code>script</code> vs. <code>module</code>)
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
    "import/unambiguous": "warn",

    // Report CommonJS <code>require</code> calls and <code>module.exports</code> or <code>exports.*</code>.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
    "import/no-commonjs": "off",

    // Report AMD <code>require</code> and <code>define</code> calls.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
    "import/no-amd": "off",

    // No Node.js builtin modules.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
    "import/no-nodejs-modules": "off",

    // ==================================
    // STYLE GUIDE
    // ==================================

    // Ensure all imports appear before other statements
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    "import/first": "warn",

    // Report repeated import of the same module in multiple places
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    "import/no-duplicates": "warn",

    // Report namespace imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
    "import/no-namespace": "warn",

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    "import/extensions": ["warn", { js: "never", jsx: "never", json: "always" }],

    // Enforce a convention in module import order
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    "import/order": ["warn", { "newlines-between": "never" }],

    // Enforce a newline after import statements
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    "import/newline-after-import": "warn",

    // Prefer a default export if module exports a single name
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    "import/prefer-default-export": "warn",

    // Limit the maximum number of dependencies a module can have
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md
    "import/max-dependencies": "off",

    // Forbid unassigned imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md
    "import/no-unassigned-import": ["warn", { allow: ["stories/Reports/FakeGlobals", "**/*.less"] }],

    // Forbid named default exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
    "import/no-named-default": "error",

    // Forbid anonymous values as default exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md
    "import/no-anonymous-default-export": "warn",
};
