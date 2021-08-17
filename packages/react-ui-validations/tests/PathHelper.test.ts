import { extractPath, extractTokens, PathTokensCache } from '../src/Validations/PathHelper';

describe('PathHelper', () => {
  describe('extractPath', () => {
    describe('classic function', () => {
      it('empty path', () => {
        const path = extractPath('function(x){return x;}');
        expect(path).toStrictEqual('');
      });
      it('empty path with extra spaces', () => {
        const path = extractPath('  function  (  x  )  {  return  x  ;  }  ');
        expect(path).toStrictEqual('');
      });
      it('optional ;', () => {
        const path = extractPath('function(x){return x}');
        expect(path).toStrictEqual('');
      });
      it("ignore 'use strict' firefox46 single quote", () => {
        const path = extractPath("function(x){  'use strict'  return x}");
        expect(path).toStrictEqual('');
      });
      it('ignore "use strict" firefox46 double quote', () => {
        const path = extractPath('function(x){  "use strict"  return x}');
        expect(path).toStrictEqual('');
      });
      it('remove dot', () => {
        const path = extractPath('function(x) { return x.aaa; }');
        expect(path).toStrictEqual('aaa');
      });
      it('remove dot with extra spaces', () => {
        const path = extractPath('function(x) { return   x  .  aaa  ;  }  ');
        expect(path).toStrictEqual('aaa');
      });
      it('remove dot for any content', () => {
        const path = extractPath('function(x) { return   x  .  v djf g" dsd] f[sl dfgj   }');
        expect(path).toStrictEqual('v djf g" dsd] f[sl dfgj');
      });
      it('do not remove [', () => {
        const path = extractPath('function(x) { return x[aaa] }');
        expect(path).toStrictEqual('[aaa]');
      });
      it('do not remove [ with extra spaces', () => {
        const path = extractPath('function(x) { return   x  [  aaa  ]  }');
        expect(path).toStrictEqual('[  aaa  ]');
      });
      it('do not remove [ for any content', () => {
        const path = extractPath('function(x) { return  x  [  v djf g" dsd] f[sl dfgj   }  ');
        expect(path).toStrictEqual('[  v djf g" dsd] f[sl dfgj');
      });
    });
    describe('arrow function', () => {
      it('empty path', () => {
        const path = extractPath('x => x');
        expect(path).toStrictEqual('');
      });
      it('empty path with extra spaces', () => {
        const path = extractPath('x   =>   x   ');
        expect(path).toStrictEqual('');
      });
      it('ignore ()', () => {
        const path = extractPath('(x) => x');
        expect(path).toStrictEqual('');
      });
      it('ignore () with extra spaces', () => {
        const path = extractPath('(  x  )  => x');
        expect(path).toStrictEqual('');
      });
      it('remove dot', () => {
        const path = extractPath('x => x.aaa');
        expect(path).toStrictEqual('aaa');
      });
      it('remove dot with extra spaces', () => {
        const path = extractPath('x => x  .  aaa  ');
        expect(path).toStrictEqual('aaa');
      });
      it('remove dot for any content', () => {
        const path = extractPath('x => x  .  v djf g" dsd] f[sl dfgj   ');
        expect(path).toStrictEqual('v djf g" dsd] f[sl dfgj');
      });
      it('do not remove [', () => {
        const path = extractPath('x => x[aaa]');
        expect(path).toStrictEqual('[aaa]');
      });
      it('do not remove [ with extra spaces', () => {
        const path = extractPath('x => x  [  aaa  ]  ');
        expect(path).toStrictEqual('[  aaa  ]');
      });
      it('do not remove [ for any content', () => {
        const path = extractPath('x => x  [  v djf g" dsd] f[sl dfgj   ');
        expect(path).toStrictEqual('[  v djf g" dsd] f[sl dfgj');
      });
    });
  });
  describe('extractTokens', () => {
    it('empty', () => {
      const path = extractTokens('');
      expect(path).toStrictEqual([]);
    });
    it('single prop', () => {
      const path = extractTokens('aaa');
      expect(path).toStrictEqual(['aaa']);
    });
    it('single indexer', () => {
      const path = extractTokens('[0]');
      expect(path).toStrictEqual(['0']);
    });
    it('two indexers', () => {
      const path = extractTokens('[0][1]');
      expect(path).toStrictEqual(['0', '1']);
    });
    it('two props', () => {
      const path = extractTokens('aaa.bbb');
      expect(path).toStrictEqual(['aaa', 'bbb']);
    });
    it('combination', () => {
      const path = extractTokens('xxx.aaa[0].bbb[1][2].zzz');
      expect(path).toStrictEqual(['xxx', 'aaa', '0', 'bbb', '1', '2', 'zzz']);
    });
    it('ignore whitespaces', () => {
      const path = extractTokens('xxx  .  aaa  [  0  ]  .  bbb  [  1  ]  [  2  ]  .  zzz');
      expect(path).toStrictEqual(['xxx', 'aaa', '0', 'bbb', '1', '2', 'zzz']);
    });
  });
  describe('PathTokensCache', () => {
    it('test', () => {
      const tokens = new PathTokensCache();
      expect(tokens.size).toStrictEqual(0);

      const has1 = tokens.has<any, any>((x) => x.aaa);
      expect(has1).toStrictEqual(false);

      const path1 = tokens.getOrAdd<any, any>((x) => x.aaa);
      expect(path1).toStrictEqual(['aaa']);

      const has2 = tokens.has<any, any>((x) => x.aaa);
      expect(has2).toStrictEqual(true);

      const path2 = tokens.getOrAdd<any, any>((x) => x.aaa);
      expect(path2).toStrictEqual(['aaa']);
      expect(tokens.size).toStrictEqual(1);
    });
  });
});
