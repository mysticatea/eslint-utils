import * as ESLintUtils from "../";
import * as ESLint from "eslint";

ESLintUtils.findVariable(
  ("initialScope" as unknown) as ESLint.Scope.Scope,
  "nameOrNode" as string
);
