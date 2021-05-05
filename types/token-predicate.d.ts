/**
 * Checks if the given token is an arrow token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is an arrow token.
 */
export function isArrowToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a comma token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
export function isCommaToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a semicolon token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a semicolon token.
 */
export function isSemicolonToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a colon token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a colon token.
 */
export function isColonToken(token: AST.Token): boolean;
/**
 * Checks if the given token is an opening parenthesis token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening parenthesis token.
 */
export function isOpeningParenToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a closing parenthesis token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing parenthesis token.
 */
export function isClosingParenToken(token: AST.Token): boolean;
/**
 * Checks if the given token is an opening square bracket token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening square bracket token.
 */
export function isOpeningBracketToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a closing square bracket token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing square bracket token.
 */
export function isClosingBracketToken(token: AST.Token): boolean;
/**
 * Checks if the given token is an opening brace token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening brace token.
 */
export function isOpeningBraceToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a closing brace token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing brace token.
 */
export function isClosingBraceToken(token: AST.Token): boolean;
/**
 * Checks if the given token is a comment token or not.
 * @param {AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comment token.
 */
export function isCommentToken(token: AST.Token): boolean;
export function isNotArrowToken(arg0: AST.Token): boolean;
export function isNotCommaToken(arg0: AST.Token): boolean;
export function isNotSemicolonToken(arg0: AST.Token): boolean;
export function isNotColonToken(arg0: AST.Token): boolean;
export function isNotOpeningParenToken(arg0: AST.Token): boolean;
export function isNotClosingParenToken(arg0: AST.Token): boolean;
export function isNotOpeningBracketToken(arg0: AST.Token): boolean;
export function isNotClosingBracketToken(arg0: AST.Token): boolean;
export function isNotOpeningBraceToken(arg0: AST.Token): boolean;
export function isNotClosingBraceToken(arg0: AST.Token): boolean;
export function isNotCommentToken(arg0: AST.Token): boolean;
import { AST } from "eslint";
