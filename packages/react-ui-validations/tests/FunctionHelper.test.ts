import {FunctionHelper} from "../src/Validations/FunctionHelper";

describe("FunctionHelper", () => {
  describe("getLambdaPath", () => {
    it("empty path", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x);
      expect(path).toStrictEqual([]);
    });
    it("single node", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x.aaa);
      expect(path).toStrictEqual(["aaa"]);
    });
    it("several nodes", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x.aaa.bbb.ccc);
      expect(path).toStrictEqual(["aaa", "bbb", "ccc"]);
    });
    it("single indexer", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x[0]);
      expect(path).toStrictEqual(["0"]);
    });
    it("indexer from root", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x[0].aaa);
      expect(path).toStrictEqual(["0", "aaa"]);
    });
    it("indexer of indexer", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x[1][2]);
      expect(path).toStrictEqual(["1", "2"]);
    });
    it("indexer in middle", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x.aaa[0].bbb);
      expect(path).toStrictEqual(["aaa", "0", "bbb"]);
    });
    it("indexer on the end", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x.aaa[0]);
      expect(path).toStrictEqual(["aaa", "0"]);
    });
    it("array items access", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => x[0].aaa[1].bbb.ccc[2]);
      expect(path).toStrictEqual(["0", "aaa", "1", "bbb", "ccc", "2"]);
    });
    it("ignore \"use strict\" firefox46 double quote", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => {
        "use strict";
        return x.a.b.c;
      });
      expect(path).toStrictEqual(["a", "b", "c"]);
    });
    it("ignore 'use strict' firefox46 single quote", () => {
      const path = FunctionHelper.getLambdaPath((x: any) => {
        'use strict';
        return x.a.b.c;
      });
      expect(path).toStrictEqual(["a", "b", "c"]);
    });
  });
});
