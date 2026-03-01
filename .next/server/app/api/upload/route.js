/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_api_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api-auth */ \"(rsc)/./lib/api-auth.ts\");\n/* harmony import */ var _lib_rate_limit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/rate-limit */ \"(rsc)/./lib/rate-limit.ts\");\n/* harmony import */ var _lib_ip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/ip */ \"(rsc)/./lib/ip.ts\");\n/* harmony import */ var _lib_blob__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/blob */ \"(rsc)/./lib/blob.ts\");\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n\n\n\n\n\n\n\nconst MAX_FILE_BYTES = 20 * 1024 * 1024;\nconst runtime = \"nodejs\";\nasync function POST(request) {\n    if (!await (0,_lib_api_auth__WEBPACK_IMPORTED_MODULE_2__.requireAuth)()) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const ip = (0,_lib_ip__WEBPACK_IMPORTED_MODULE_4__.getClientIp)(request);\n    const limit = (0,_lib_rate_limit__WEBPACK_IMPORTED_MODULE_3__.rateLimit)(`upload:${ip}`, 10, 60 * 60 * 1000);\n    if (!limit.ok) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Rate limit exceeded\"\n        }, {\n            status: 429\n        });\n    }\n    const formData = await request.formData();\n    const file = formData.get(\"file\");\n    if (!file || !(file instanceof File)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"File required\"\n        }, {\n            status: 400\n        });\n    }\n    if (file.type !== \"application/pdf\") {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Only PDF files supported\"\n        }, {\n            status: 400\n        });\n    }\n    if (file.size > MAX_FILE_BYTES) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"File too large\"\n        }, {\n            status: 400\n        });\n    }\n    const buffer = await file.arrayBuffer();\n    const blob = await (0,_lib_blob__WEBPACK_IMPORTED_MODULE_5__.uploadPdf)(`${crypto__WEBPACK_IMPORTED_MODULE_1___default().randomUUID()}.pdf`, buffer);\n    const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_6__.supabaseAdmin.from(\"documents\").insert({\n        title: file.name,\n        blob_url: blob.url,\n        status: \"uploaded\"\n    }).select(\"id, title, blob_url, status\").single();\n    if (error || !data) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message ?? \"Failed to save\"\n        }, {\n            status: 500\n        });\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        document: data\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ2Y7QUFDaUI7QUFDQTtBQUNOO0FBQ0E7QUFDUTtBQUUvQyxNQUFNTyxpQkFBaUIsS0FBSyxPQUFPO0FBQzVCLE1BQU1DLFVBQVUsU0FBUztBQUV6QixlQUFlQyxLQUFLQyxPQUFnQjtJQUN6QyxJQUFJLENBQUUsTUFBTVIsMERBQVdBLElBQUs7UUFDMUIsT0FBT0YscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7SUFFQSxNQUFNQyxLQUFLVixvREFBV0EsQ0FBQ007SUFDdkIsTUFBTUssUUFBUVosMERBQVNBLENBQUMsQ0FBQyxPQUFPLEVBQUVXLElBQUksRUFBRSxJQUFJLEtBQUssS0FBSztJQUN0RCxJQUFJLENBQUNDLE1BQU1DLEVBQUUsRUFBRTtRQUNiLE9BQU9oQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBc0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDM0U7SUFFQSxNQUFNSSxXQUFXLE1BQU1QLFFBQVFPLFFBQVE7SUFDdkMsTUFBTUMsT0FBT0QsU0FBU0UsR0FBRyxDQUFDO0lBQzFCLElBQUksQ0FBQ0QsUUFBUSxDQUFFQSxDQUFBQSxnQkFBZ0JFLElBQUcsR0FBSTtRQUNwQyxPQUFPcEIscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0lBRUEsSUFBSUssS0FBS0csSUFBSSxLQUFLLG1CQUFtQjtRQUNuQyxPQUFPckIscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQTJCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ2hGO0lBRUEsSUFBSUssS0FBS0ksSUFBSSxHQUFHZixnQkFBZ0I7UUFDOUIsT0FBT1AscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWlCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3RFO0lBRUEsTUFBTVUsU0FBUyxNQUFNTCxLQUFLTSxXQUFXO0lBQ3JDLE1BQU1DLE9BQU8sTUFBTXBCLG9EQUFTQSxDQUFDLEdBQUdKLHdEQUFpQixHQUFHLElBQUksQ0FBQyxFQUFFc0I7SUFFM0QsTUFBTSxFQUFFSSxJQUFJLEVBQUVmLEtBQUssRUFBRSxHQUFHLE1BQU1OLHdEQUFhQSxDQUN4Q3NCLElBQUksQ0FBQyxhQUNMQyxNQUFNLENBQUM7UUFDTkMsT0FBT1osS0FBS2EsSUFBSTtRQUNoQkMsVUFBVVAsS0FBS1EsR0FBRztRQUNsQnBCLFFBQVE7SUFDVixHQUNDcUIsTUFBTSxDQUFDLCtCQUNQQyxNQUFNO0lBRVQsSUFBSXZCLFNBQVMsQ0FBQ2UsTUFBTTtRQUNsQixPQUFPM0IscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPQSxPQUFPd0IsV0FBVztRQUFpQixHQUFHO1lBQUV2QixRQUFRO1FBQUk7SUFDeEY7SUFFQSxPQUFPYixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1FBQUUwQixVQUFVVjtJQUFLO0FBQzVDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHlhZmk3XFxEZXNrdG9wXFxjMG1waWxlZFxcYXBwXFxhcGlcXHVwbG9hZFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IHJlcXVpcmVBdXRoIH0gZnJvbSBcIkAvbGliL2FwaS1hdXRoXCI7XG5pbXBvcnQgeyByYXRlTGltaXQgfSBmcm9tIFwiQC9saWIvcmF0ZS1saW1pdFwiO1xuaW1wb3J0IHsgZ2V0Q2xpZW50SXAgfSBmcm9tIFwiQC9saWIvaXBcIjtcbmltcG9ydCB7IHVwbG9hZFBkZiB9IGZyb20gXCJAL2xpYi9ibG9iXCI7XG5pbXBvcnQgeyBzdXBhYmFzZUFkbWluIH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlXCI7XG5cbmNvbnN0IE1BWF9GSUxFX0JZVEVTID0gMjAgKiAxMDI0ICogMTAyNDtcbmV4cG9ydCBjb25zdCBydW50aW1lID0gXCJub2RlanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICBpZiAoIShhd2FpdCByZXF1aXJlQXV0aCgpKSkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gIH1cblxuICBjb25zdCBpcCA9IGdldENsaWVudElwKHJlcXVlc3QpO1xuICBjb25zdCBsaW1pdCA9IHJhdGVMaW1pdChgdXBsb2FkOiR7aXB9YCwgMTAsIDYwICogNjAgKiAxMDAwKTtcbiAgaWYgKCFsaW1pdC5vaykge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlJhdGUgbGltaXQgZXhjZWVkZWRcIiB9LCB7IHN0YXR1czogNDI5IH0pO1xuICB9XG5cbiAgY29uc3QgZm9ybURhdGEgPSBhd2FpdCByZXF1ZXN0LmZvcm1EYXRhKCk7XG4gIGNvbnN0IGZpbGUgPSBmb3JtRGF0YS5nZXQoXCJmaWxlXCIpO1xuICBpZiAoIWZpbGUgfHwgIShmaWxlIGluc3RhbmNlb2YgRmlsZSkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGaWxlIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgfVxuXG4gIGlmIChmaWxlLnR5cGUgIT09IFwiYXBwbGljYXRpb24vcGRmXCIpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJPbmx5IFBERiBmaWxlcyBzdXBwb3J0ZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgaWYgKGZpbGUuc2l6ZSA+IE1BWF9GSUxFX0JZVEVTKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmlsZSB0b28gbGFyZ2VcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpO1xuICBjb25zdCBibG9iID0gYXdhaXQgdXBsb2FkUGRmKGAke2NyeXB0by5yYW5kb21VVUlEKCl9LnBkZmAsIGJ1ZmZlcik7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgIC5mcm9tKFwiZG9jdW1lbnRzXCIpXG4gICAgLmluc2VydCh7XG4gICAgICB0aXRsZTogZmlsZS5uYW1lLFxuICAgICAgYmxvYl91cmw6IGJsb2IudXJsLFxuICAgICAgc3RhdHVzOiBcInVwbG9hZGVkXCJcbiAgICB9KVxuICAgIC5zZWxlY3QoXCJpZCwgdGl0bGUsIGJsb2JfdXJsLCBzdGF0dXNcIilcbiAgICAuc2luZ2xlKCk7XG5cbiAgaWYgKGVycm9yIHx8ICFkYXRhKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yPy5tZXNzYWdlID8/IFwiRmFpbGVkIHRvIHNhdmVcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZG9jdW1lbnQ6IGRhdGEgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY3J5cHRvIiwicmVxdWlyZUF1dGgiLCJyYXRlTGltaXQiLCJnZXRDbGllbnRJcCIsInVwbG9hZFBkZiIsInN1cGFiYXNlQWRtaW4iLCJNQVhfRklMRV9CWVRFUyIsInJ1bnRpbWUiLCJQT1NUIiwicmVxdWVzdCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImlwIiwibGltaXQiLCJvayIsImZvcm1EYXRhIiwiZmlsZSIsImdldCIsIkZpbGUiLCJ0eXBlIiwic2l6ZSIsImJ1ZmZlciIsImFycmF5QnVmZmVyIiwiYmxvYiIsInJhbmRvbVVVSUQiLCJkYXRhIiwiZnJvbSIsImluc2VydCIsInRpdGxlIiwibmFtZSIsImJsb2JfdXJsIiwidXJsIiwic2VsZWN0Iiwic2luZ2xlIiwibWVzc2FnZSIsImRvY3VtZW50Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/api-auth.ts":
/*!*************************!*\
  !*** ./lib/api-auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   requireAuth: () => (/* binding */ requireAuth)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ \"(rsc)/./lib/auth.ts\");\n\n\nasync function requireAuth() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    const value = cookieStore.get(_auth__WEBPACK_IMPORTED_MODULE_1__.authCookieName)?.value;\n    return (0,_auth__WEBPACK_IMPORTED_MODULE_1__.verifyAuthCookie)(value);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpLWF1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVDO0FBQ21CO0FBRW5ELGVBQWVHO0lBQ3BCLE1BQU1DLGNBQWMsTUFBTUoscURBQU9BO0lBQ2pDLE1BQU1LLFFBQVFELFlBQVlFLEdBQUcsQ0FBQ0wsaURBQWNBLEdBQUdJO0lBQy9DLE9BQU9ILHVEQUFnQkEsQ0FBQ0c7QUFDMUIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xceWFmaTdcXERlc2t0b3BcXGMwbXBpbGVkXFxsaWJcXGFwaS1hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyBhdXRoQ29va2llTmFtZSwgdmVyaWZ5QXV0aENvb2tpZSB9IGZyb20gXCIuL2F1dGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBdXRoKCkge1xuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcbiAgY29uc3QgdmFsdWUgPSBjb29raWVTdG9yZS5nZXQoYXV0aENvb2tpZU5hbWUpPy52YWx1ZTtcbiAgcmV0dXJuIHZlcmlmeUF1dGhDb29raWUodmFsdWUpO1xufVxuIl0sIm5hbWVzIjpbImNvb2tpZXMiLCJhdXRoQ29va2llTmFtZSIsInZlcmlmeUF1dGhDb29raWUiLCJyZXF1aXJlQXV0aCIsImNvb2tpZVN0b3JlIiwidmFsdWUiLCJnZXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/api-auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authCookieName: () => (/* binding */ authCookieName),\n/* harmony export */   createAuthCookie: () => (/* binding */ createAuthCookie),\n/* harmony export */   validatePassword: () => (/* binding */ validatePassword),\n/* harmony export */   verifyAuthCookie: () => (/* binding */ verifyAuthCookie)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env */ \"(rsc)/./lib/env.ts\");\n\n\nconst COOKIE_NAME = \"papertalk_auth\";\nfunction hmac(value) {\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHmac(\"sha256\", _env__WEBPACK_IMPORTED_MODULE_1__.env.APP_SESSION_SECRET).update(value).digest(\"hex\");\n}\nfunction createAuthCookie() {\n    const payload = `ok:${Date.now()}`;\n    const signature = hmac(payload);\n    return `${payload}.${signature}`;\n}\nfunction verifyAuthCookie(cookieValue) {\n    if (!cookieValue) return false;\n    const decoded = decodeCookieValue(cookieValue);\n    const [payload, signature] = decoded.split(\".\");\n    if (!payload || !signature) return false;\n    const expected = hmac(payload);\n    if (signature.length !== expected.length) return false;\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default().timingSafeEqual(Buffer.from(signature), Buffer.from(expected));\n}\nfunction decodeCookieValue(value) {\n    try {\n        return decodeURIComponent(value);\n    } catch  {\n        return value;\n    }\n}\nfunction validatePassword(password) {\n    const provided = crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash(\"sha256\").update(password).digest(\"hex\");\n    const expected = crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash(\"sha256\").update(_env__WEBPACK_IMPORTED_MODULE_1__.env.APP_AUTH_PASSWORD).digest(\"hex\");\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default().timingSafeEqual(Buffer.from(provided), Buffer.from(expected));\n}\nconst authCookieName = COOKIE_NAME;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTRCO0FBQ0E7QUFFNUIsTUFBTUUsY0FBYztBQUVwQixTQUFTQyxLQUFLQyxLQUFhO0lBQ3pCLE9BQU9KLHdEQUNNLENBQUMsVUFBVUMscUNBQUdBLENBQUNLLGtCQUFrQixFQUMzQ0MsTUFBTSxDQUFDSCxPQUNQSSxNQUFNLENBQUM7QUFDWjtBQUVPLFNBQVNDO0lBQ2QsTUFBTUMsVUFBVSxDQUFDLEdBQUcsRUFBRUMsS0FBS0MsR0FBRyxJQUFJO0lBQ2xDLE1BQU1DLFlBQVlWLEtBQUtPO0lBQ3ZCLE9BQU8sR0FBR0EsUUFBUSxDQUFDLEVBQUVHLFdBQVc7QUFDbEM7QUFFTyxTQUFTQyxpQkFBaUJDLFdBQStCO0lBQzlELElBQUksQ0FBQ0EsYUFBYSxPQUFPO0lBQ3pCLE1BQU1DLFVBQVVDLGtCQUFrQkY7SUFDbEMsTUFBTSxDQUFDTCxTQUFTRyxVQUFVLEdBQUdHLFFBQVFFLEtBQUssQ0FBQztJQUMzQyxJQUFJLENBQUNSLFdBQVcsQ0FBQ0csV0FBVyxPQUFPO0lBQ25DLE1BQU1NLFdBQVdoQixLQUFLTztJQUN0QixJQUFJRyxVQUFVTyxNQUFNLEtBQUtELFNBQVNDLE1BQU0sRUFBRSxPQUFPO0lBQ2pELE9BQU9wQiw2REFBc0IsQ0FBQ3NCLE9BQU9DLElBQUksQ0FBQ1YsWUFBWVMsT0FBT0MsSUFBSSxDQUFDSjtBQUNwRTtBQUVBLFNBQVNGLGtCQUFrQmIsS0FBYTtJQUN0QyxJQUFJO1FBQ0YsT0FBT29CLG1CQUFtQnBCO0lBQzVCLEVBQUUsT0FBTTtRQUNOLE9BQU9BO0lBQ1Q7QUFDRjtBQUVPLFNBQVNxQixpQkFBaUJDLFFBQWdCO0lBQy9DLE1BQU1DLFdBQVczQix3REFBaUIsQ0FBQyxVQUFVTyxNQUFNLENBQUNtQixVQUFVbEIsTUFBTSxDQUFDO0lBQ3JFLE1BQU1XLFdBQVduQix3REFBaUIsQ0FBQyxVQUFVTyxNQUFNLENBQUNOLHFDQUFHQSxDQUFDNEIsaUJBQWlCLEVBQUVyQixNQUFNLENBQUM7SUFDbEYsT0FBT1IsNkRBQXNCLENBQUNzQixPQUFPQyxJQUFJLENBQUNJLFdBQVdMLE9BQU9DLElBQUksQ0FBQ0o7QUFDbkU7QUFFTyxNQUFNVyxpQkFBaUI1QixZQUFZIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHlhZmk3XFxEZXNrdG9wXFxjMG1waWxlZFxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdG8gZnJvbSBcImNyeXB0b1wiO1xuaW1wb3J0IHsgZW52IH0gZnJvbSBcIi4vZW52XCI7XG5cbmNvbnN0IENPT0tJRV9OQU1FID0gXCJwYXBlcnRhbGtfYXV0aFwiO1xuXG5mdW5jdGlvbiBobWFjKHZhbHVlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGNyeXB0b1xuICAgIC5jcmVhdGVIbWFjKFwic2hhMjU2XCIsIGVudi5BUFBfU0VTU0lPTl9TRUNSRVQpXG4gICAgLnVwZGF0ZSh2YWx1ZSlcbiAgICAuZGlnZXN0KFwiaGV4XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXV0aENvb2tpZSgpIHtcbiAgY29uc3QgcGF5bG9hZCA9IGBvazoke0RhdGUubm93KCl9YDtcbiAgY29uc3Qgc2lnbmF0dXJlID0gaG1hYyhwYXlsb2FkKTtcbiAgcmV0dXJuIGAke3BheWxvYWR9LiR7c2lnbmF0dXJlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlBdXRoQ29va2llKGNvb2tpZVZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgaWYgKCFjb29raWVWYWx1ZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBkZWNvZGVkID0gZGVjb2RlQ29va2llVmFsdWUoY29va2llVmFsdWUpO1xuICBjb25zdCBbcGF5bG9hZCwgc2lnbmF0dXJlXSA9IGRlY29kZWQuc3BsaXQoXCIuXCIpO1xuICBpZiAoIXBheWxvYWQgfHwgIXNpZ25hdHVyZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBleHBlY3RlZCA9IGhtYWMocGF5bG9hZCk7XG4gIGlmIChzaWduYXR1cmUubGVuZ3RoICE9PSBleHBlY3RlZC5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGNyeXB0by50aW1pbmdTYWZlRXF1YWwoQnVmZmVyLmZyb20oc2lnbmF0dXJlKSwgQnVmZmVyLmZyb20oZXhwZWN0ZWQpKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlQ29va2llVmFsdWUodmFsdWU6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZykge1xuICBjb25zdCBwcm92aWRlZCA9IGNyeXB0by5jcmVhdGVIYXNoKFwic2hhMjU2XCIpLnVwZGF0ZShwYXNzd29yZCkuZGlnZXN0KFwiaGV4XCIpO1xuICBjb25zdCBleHBlY3RlZCA9IGNyeXB0by5jcmVhdGVIYXNoKFwic2hhMjU2XCIpLnVwZGF0ZShlbnYuQVBQX0FVVEhfUEFTU1dPUkQpLmRpZ2VzdChcImhleFwiKTtcbiAgcmV0dXJuIGNyeXB0by50aW1pbmdTYWZlRXF1YWwoQnVmZmVyLmZyb20ocHJvdmlkZWQpLCBCdWZmZXIuZnJvbShleHBlY3RlZCkpO1xufVxuXG5leHBvcnQgY29uc3QgYXV0aENvb2tpZU5hbWUgPSBDT09LSUVfTkFNRTtcbiJdLCJuYW1lcyI6WyJjcnlwdG8iLCJlbnYiLCJDT09LSUVfTkFNRSIsImhtYWMiLCJ2YWx1ZSIsImNyZWF0ZUhtYWMiLCJBUFBfU0VTU0lPTl9TRUNSRVQiLCJ1cGRhdGUiLCJkaWdlc3QiLCJjcmVhdGVBdXRoQ29va2llIiwicGF5bG9hZCIsIkRhdGUiLCJub3ciLCJzaWduYXR1cmUiLCJ2ZXJpZnlBdXRoQ29va2llIiwiY29va2llVmFsdWUiLCJkZWNvZGVkIiwiZGVjb2RlQ29va2llVmFsdWUiLCJzcGxpdCIsImV4cGVjdGVkIiwibGVuZ3RoIiwidGltaW5nU2FmZUVxdWFsIiwiQnVmZmVyIiwiZnJvbSIsImRlY29kZVVSSUNvbXBvbmVudCIsInZhbGlkYXRlUGFzc3dvcmQiLCJwYXNzd29yZCIsInByb3ZpZGVkIiwiY3JlYXRlSGFzaCIsIkFQUF9BVVRIX1BBU1NXT1JEIiwiYXV0aENvb2tpZU5hbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/blob.ts":
/*!*********************!*\
  !*** ./lib/blob.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchBlob: () => (/* binding */ fetchBlob),\n/* harmony export */   uploadPdf: () => (/* binding */ uploadPdf)\n/* harmony export */ });\n/* harmony import */ var _vercel_blob__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vercel/blob */ \"(rsc)/./node_modules/@vercel/blob/dist/index.js\");\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ \"(rsc)/./lib/env.ts\");\n\n\nasync function uploadPdf(name, data) {\n    const result = await (0,_vercel_blob__WEBPACK_IMPORTED_MODULE_1__.put)(name, data, {\n        access: \"public\",\n        contentType: \"application/pdf\",\n        token: _env__WEBPACK_IMPORTED_MODULE_0__.env.VERCEL_BLOB_READ_WRITE_TOKEN\n    });\n    return result;\n}\nasync function fetchBlob(url) {\n    const response = await fetch(url, {\n        headers: {\n            Authorization: `Bearer ${_env__WEBPACK_IMPORTED_MODULE_0__.env.VERCEL_BLOB_READ_WRITE_TOKEN}`\n        }\n    });\n    if (!response.ok) {\n        throw new Error(`Failed to fetch blob: ${response.status}`);\n    }\n    return response.arrayBuffer();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYmxvYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQW1DO0FBQ1A7QUFFckIsZUFBZUUsVUFBVUMsSUFBWSxFQUFFQyxJQUFpQjtJQUM3RCxNQUFNQyxTQUFTLE1BQU1MLGlEQUFHQSxDQUFDRyxNQUFNQyxNQUFNO1FBQ25DRSxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsT0FBT1AscUNBQUdBLENBQUNRLDRCQUE0QjtJQUN6QztJQUVBLE9BQU9KO0FBQ1Q7QUFFTyxlQUFlSyxVQUFVQyxHQUFXO0lBQ3pDLE1BQU1DLFdBQVcsTUFBTUMsTUFBTUYsS0FBSztRQUNoQ0csU0FBUztZQUNQQyxlQUFlLENBQUMsT0FBTyxFQUFFZCxxQ0FBR0EsQ0FBQ1EsNEJBQTRCLEVBQUU7UUFDN0Q7SUFDRjtJQUVBLElBQUksQ0FBQ0csU0FBU0ksRUFBRSxFQUFFO1FBQ2hCLE1BQU0sSUFBSUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFTCxTQUFTTSxNQUFNLEVBQUU7SUFDNUQ7SUFFQSxPQUFPTixTQUFTTyxXQUFXO0FBQzdCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHlhZmk3XFxEZXNrdG9wXFxjMG1waWxlZFxcbGliXFxibG9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1dCB9IGZyb20gXCJAdmVyY2VsL2Jsb2JcIjtcbmltcG9ydCB7IGVudiB9IGZyb20gXCIuL2VudlwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkUGRmKG5hbWU6IHN0cmluZywgZGF0YTogQXJyYXlCdWZmZXIpIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHV0KG5hbWUsIGRhdGEsIHtcbiAgICBhY2Nlc3M6IFwicHVibGljXCIsXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIsXG4gICAgdG9rZW46IGVudi5WRVJDRUxfQkxPQl9SRUFEX1dSSVRFX1RPS0VOXG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEJsb2IodXJsOiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7ZW52LlZFUkNFTF9CTE9CX1JFQURfV1JJVEVfVE9LRU59YFxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGJsb2I6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG59XG4iXSwibmFtZXMiOlsicHV0IiwiZW52IiwidXBsb2FkUGRmIiwibmFtZSIsImRhdGEiLCJyZXN1bHQiLCJhY2Nlc3MiLCJjb250ZW50VHlwZSIsInRva2VuIiwiVkVSQ0VMX0JMT0JfUkVBRF9XUklURV9UT0tFTiIsImZldGNoQmxvYiIsInVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIm9rIiwiRXJyb3IiLCJzdGF0dXMiLCJhcnJheUJ1ZmZlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/blob.ts\n");

/***/ }),

/***/ "(rsc)/./lib/env.ts":
/*!********************!*\
  !*** ./lib/env.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   env: () => (/* binding */ env)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n\nconst envSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    OPENAI_API_KEY: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1),\n    OPENAI_REALTIME_MODEL: zod__WEBPACK_IMPORTED_MODULE_0__.string().default(\"gpt-4o-realtime-preview\"),\n    OPENAI_EMBEDDING_MODEL: zod__WEBPACK_IMPORTED_MODULE_0__.string().default(\"text-embedding-3-small\"),\n    OPENAI_OCR_MODEL: zod__WEBPACK_IMPORTED_MODULE_0__.string().default(\"gpt-4o-mini\"),\n    SUPABASE_URL: zod__WEBPACK_IMPORTED_MODULE_0__.string().url(),\n    SUPABASE_SERVICE_ROLE_KEY: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1),\n    VERCEL_BLOB_READ_WRITE_TOKEN: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1),\n    APP_AUTH_PASSWORD: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1),\n    APP_SESSION_SECRET: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(16)\n});\nconst env = envSchema.parse({\n    OPENAI_API_KEY: process.env.OPENAI_API_KEY,\n    OPENAI_REALTIME_MODEL: process.env.OPENAI_REALTIME_MODEL,\n    OPENAI_EMBEDDING_MODEL: process.env.OPENAI_EMBEDDING_MODEL,\n    OPENAI_OCR_MODEL: process.env.OPENAI_OCR_MODEL,\n    SUPABASE_URL: process.env.SUPABASE_URL,\n    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,\n    VERCEL_BLOB_READ_WRITE_TOKEN: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,\n    APP_AUTH_PASSWORD: process.env.APP_AUTH_PASSWORD,\n    APP_SESSION_SECRET: process.env.APP_SESSION_SECRET\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZW52LnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXdCO0FBRXhCLE1BQU1DLFlBQVlELHVDQUFRLENBQUM7SUFDekJHLGdCQUFnQkgsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQy9CQyx1QkFBdUJOLHVDQUFRLEdBQUdPLE9BQU8sQ0FBQztJQUMxQ0Msd0JBQXdCUix1Q0FBUSxHQUFHTyxPQUFPLENBQUM7SUFDM0NFLGtCQUFrQlQsdUNBQVEsR0FBR08sT0FBTyxDQUFDO0lBQ3JDRyxjQUFjVix1Q0FBUSxHQUFHVyxHQUFHO0lBQzVCQywyQkFBMkJaLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQztJQUMxQ1EsOEJBQThCYix1Q0FBUSxHQUFHSyxHQUFHLENBQUM7SUFDN0NTLG1CQUFtQmQsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQ2xDVSxvQkFBb0JmLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQztBQUNyQztBQUVPLE1BQU1XLE1BQU1mLFVBQVVnQixLQUFLLENBQUM7SUFDakNkLGdCQUFnQmUsUUFBUUYsR0FBRyxDQUFDYixjQUFjO0lBQzFDRyx1QkFBdUJZLFFBQVFGLEdBQUcsQ0FBQ1YscUJBQXFCO0lBQ3hERSx3QkFBd0JVLFFBQVFGLEdBQUcsQ0FBQ1Isc0JBQXNCO0lBQzFEQyxrQkFBa0JTLFFBQVFGLEdBQUcsQ0FBQ1AsZ0JBQWdCO0lBQzlDQyxjQUFjUSxRQUFRRixHQUFHLENBQUNOLFlBQVk7SUFDdENFLDJCQUEyQk0sUUFBUUYsR0FBRyxDQUFDSix5QkFBeUI7SUFDaEVDLDhCQUE4QkssUUFBUUYsR0FBRyxDQUFDSCw0QkFBNEI7SUFDdEVDLG1CQUFtQkksUUFBUUYsR0FBRyxDQUFDRixpQkFBaUI7SUFDaERDLG9CQUFvQkcsUUFBUUYsR0FBRyxDQUFDRCxrQkFBa0I7QUFDcEQsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx5YWZpN1xcRGVza3RvcFxcYzBtcGlsZWRcXGxpYlxcZW52LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmNvbnN0IGVudlNjaGVtYSA9IHoub2JqZWN0KHtcbiAgT1BFTkFJX0FQSV9LRVk6IHouc3RyaW5nKCkubWluKDEpLFxuICBPUEVOQUlfUkVBTFRJTUVfTU9ERUw6IHouc3RyaW5nKCkuZGVmYXVsdChcImdwdC00by1yZWFsdGltZS1wcmV2aWV3XCIpLFxuICBPUEVOQUlfRU1CRURESU5HX01PREVMOiB6LnN0cmluZygpLmRlZmF1bHQoXCJ0ZXh0LWVtYmVkZGluZy0zLXNtYWxsXCIpLFxuICBPUEVOQUlfT0NSX01PREVMOiB6LnN0cmluZygpLmRlZmF1bHQoXCJncHQtNG8tbWluaVwiKSxcbiAgU1VQQUJBU0VfVVJMOiB6LnN0cmluZygpLnVybCgpLFxuICBTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZOiB6LnN0cmluZygpLm1pbigxKSxcbiAgVkVSQ0VMX0JMT0JfUkVBRF9XUklURV9UT0tFTjogei5zdHJpbmcoKS5taW4oMSksXG4gIEFQUF9BVVRIX1BBU1NXT1JEOiB6LnN0cmluZygpLm1pbigxKSxcbiAgQVBQX1NFU1NJT05fU0VDUkVUOiB6LnN0cmluZygpLm1pbigxNilcbn0pO1xuXG5leHBvcnQgY29uc3QgZW52ID0gZW52U2NoZW1hLnBhcnNlKHtcbiAgT1BFTkFJX0FQSV9LRVk6IHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZLFxuICBPUEVOQUlfUkVBTFRJTUVfTU9ERUw6IHByb2Nlc3MuZW52Lk9QRU5BSV9SRUFMVElNRV9NT0RFTCxcbiAgT1BFTkFJX0VNQkVERElOR19NT0RFTDogcHJvY2Vzcy5lbnYuT1BFTkFJX0VNQkVERElOR19NT0RFTCxcbiAgT1BFTkFJX09DUl9NT0RFTDogcHJvY2Vzcy5lbnYuT1BFTkFJX09DUl9NT0RFTCxcbiAgU1VQQUJBU0VfVVJMOiBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkwsXG4gIFNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVk6IHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVksXG4gIFZFUkNFTF9CTE9CX1JFQURfV1JJVEVfVE9LRU46IHByb2Nlc3MuZW52LlZFUkNFTF9CTE9CX1JFQURfV1JJVEVfVE9LRU4sXG4gIEFQUF9BVVRIX1BBU1NXT1JEOiBwcm9jZXNzLmVudi5BUFBfQVVUSF9QQVNTV09SRCxcbiAgQVBQX1NFU1NJT05fU0VDUkVUOiBwcm9jZXNzLmVudi5BUFBfU0VTU0lPTl9TRUNSRVRcbn0pO1xuIl0sIm5hbWVzIjpbInoiLCJlbnZTY2hlbWEiLCJvYmplY3QiLCJPUEVOQUlfQVBJX0tFWSIsInN0cmluZyIsIm1pbiIsIk9QRU5BSV9SRUFMVElNRV9NT0RFTCIsImRlZmF1bHQiLCJPUEVOQUlfRU1CRURESU5HX01PREVMIiwiT1BFTkFJX09DUl9NT0RFTCIsIlNVUEFCQVNFX1VSTCIsInVybCIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJWRVJDRUxfQkxPQl9SRUFEX1dSSVRFX1RPS0VOIiwiQVBQX0FVVEhfUEFTU1dPUkQiLCJBUFBfU0VTU0lPTl9TRUNSRVQiLCJlbnYiLCJwYXJzZSIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/env.ts\n");

/***/ }),

/***/ "(rsc)/./lib/ip.ts":
/*!*******************!*\
  !*** ./lib/ip.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getClientIp: () => (/* binding */ getClientIp)\n/* harmony export */ });\nfunction getClientIp(request) {\n    const forwarded = request.headers.get(\"x-forwarded-for\");\n    if (forwarded) {\n        return forwarded.split(\",\")[0]?.trim() ?? \"unknown\";\n    }\n    return request.headers.get(\"x-real-ip\") ?? \"unknown\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvaXAudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLFNBQVNBLFlBQVlDLE9BQWdCO0lBQzFDLE1BQU1DLFlBQVlELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQ3RDLElBQUlGLFdBQVc7UUFDYixPQUFPQSxVQUFVRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRUMsVUFBVTtJQUM1QztJQUNBLE9BQU9MLFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQjtBQUM3QyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx5YWZpN1xcRGVza3RvcFxcYzBtcGlsZWRcXGxpYlxcaXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldENsaWVudElwKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgY29uc3QgZm9yd2FyZGVkID0gcmVxdWVzdC5oZWFkZXJzLmdldChcIngtZm9yd2FyZGVkLWZvclwiKTtcbiAgaWYgKGZvcndhcmRlZCkge1xuICAgIHJldHVybiBmb3J3YXJkZWQuc3BsaXQoXCIsXCIpWzBdPy50cmltKCkgPz8gXCJ1bmtub3duXCI7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QuaGVhZGVycy5nZXQoXCJ4LXJlYWwtaXBcIikgPz8gXCJ1bmtub3duXCI7XG59XG4iXSwibmFtZXMiOlsiZ2V0Q2xpZW50SXAiLCJyZXF1ZXN0IiwiZm9yd2FyZGVkIiwiaGVhZGVycyIsImdldCIsInNwbGl0IiwidHJpbSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/ip.ts\n");

/***/ }),

/***/ "(rsc)/./lib/rate-limit.ts":
/*!***************************!*\
  !*** ./lib/rate-limit.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   rateLimit: () => (/* binding */ rateLimit)\n/* harmony export */ });\nconst store = new Map();\nfunction rateLimit(key, limit, windowMs) {\n    const now = Date.now();\n    const entry = store.get(key);\n    if (!entry || entry.resetAt < now) {\n        store.set(key, {\n            count: 1,\n            resetAt: now + windowMs\n        });\n        return {\n            ok: true,\n            remaining: limit - 1,\n            resetAt: now + windowMs\n        };\n    }\n    if (entry.count >= limit) {\n        return {\n            ok: false,\n            remaining: 0,\n            resetAt: entry.resetAt\n        };\n    }\n    entry.count += 1;\n    return {\n        ok: true,\n        remaining: limit - entry.count,\n        resetAt: entry.resetAt\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcmF0ZS1saW1pdC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTUEsUUFBUSxJQUFJQztBQUVYLFNBQVNDLFVBQVVDLEdBQVcsRUFBRUMsS0FBYSxFQUFFQyxRQUFnQjtJQUNwRSxNQUFNQyxNQUFNQyxLQUFLRCxHQUFHO0lBQ3BCLE1BQU1FLFFBQVFSLE1BQU1TLEdBQUcsQ0FBQ047SUFDeEIsSUFBSSxDQUFDSyxTQUFTQSxNQUFNRSxPQUFPLEdBQUdKLEtBQUs7UUFDakNOLE1BQU1XLEdBQUcsQ0FBQ1IsS0FBSztZQUFFUyxPQUFPO1lBQUdGLFNBQVNKLE1BQU1EO1FBQVM7UUFDbkQsT0FBTztZQUFFUSxJQUFJO1lBQU1DLFdBQVdWLFFBQVE7WUFBR00sU0FBU0osTUFBTUQ7UUFBUztJQUNuRTtJQUVBLElBQUlHLE1BQU1JLEtBQUssSUFBSVIsT0FBTztRQUN4QixPQUFPO1lBQUVTLElBQUk7WUFBT0MsV0FBVztZQUFHSixTQUFTRixNQUFNRSxPQUFPO1FBQUM7SUFDM0Q7SUFFQUYsTUFBTUksS0FBSyxJQUFJO0lBQ2YsT0FBTztRQUFFQyxJQUFJO1FBQU1DLFdBQVdWLFFBQVFJLE1BQU1JLEtBQUs7UUFBRUYsU0FBU0YsTUFBTUUsT0FBTztJQUFDO0FBQzVFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHlhZmk3XFxEZXNrdG9wXFxjMG1waWxlZFxcbGliXFxyYXRlLWxpbWl0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInR5cGUgRW50cnkgPSB7IGNvdW50OiBudW1iZXI7IHJlc2V0QXQ6IG51bWJlciB9O1xuXG5jb25zdCBzdG9yZSA9IG5ldyBNYXA8c3RyaW5nLCBFbnRyeT4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJhdGVMaW1pdChrZXk6IHN0cmluZywgbGltaXQ6IG51bWJlciwgd2luZG93TXM6IG51bWJlcikge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCBlbnRyeSA9IHN0b3JlLmdldChrZXkpO1xuICBpZiAoIWVudHJ5IHx8IGVudHJ5LnJlc2V0QXQgPCBub3cpIHtcbiAgICBzdG9yZS5zZXQoa2V5LCB7IGNvdW50OiAxLCByZXNldEF0OiBub3cgKyB3aW5kb3dNcyB9KTtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgcmVtYWluaW5nOiBsaW1pdCAtIDEsIHJlc2V0QXQ6IG5vdyArIHdpbmRvd01zIH07XG4gIH1cblxuICBpZiAoZW50cnkuY291bnQgPj0gbGltaXQpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIHJlbWFpbmluZzogMCwgcmVzZXRBdDogZW50cnkucmVzZXRBdCB9O1xuICB9XG5cbiAgZW50cnkuY291bnQgKz0gMTtcbiAgcmV0dXJuIHsgb2s6IHRydWUsIHJlbWFpbmluZzogbGltaXQgLSBlbnRyeS5jb3VudCwgcmVzZXRBdDogZW50cnkucmVzZXRBdCB9O1xufVxuIl0sIm5hbWVzIjpbInN0b3JlIiwiTWFwIiwicmF0ZUxpbWl0Iiwia2V5IiwibGltaXQiLCJ3aW5kb3dNcyIsIm5vdyIsIkRhdGUiLCJlbnRyeSIsImdldCIsInJlc2V0QXQiLCJzZXQiLCJjb3VudCIsIm9rIiwicmVtYWluaW5nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/rate-limit.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabaseAdmin: () => (/* binding */ supabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ \"(rsc)/./lib/env.ts\");\n\n\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)(_env__WEBPACK_IMPORTED_MODULE_0__.env.SUPABASE_URL, _env__WEBPACK_IMPORTED_MODULE_0__.env.SUPABASE_SERVICE_ROLE_KEY, {\n    auth: {\n        persistSession: false\n    },\n    db: {\n        schema: \"public\"\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBQ3pCO0FBRXJCLE1BQU1FLGdCQUFnQkYsbUVBQVlBLENBQUNDLHFDQUFHQSxDQUFDRSxZQUFZLEVBQUVGLHFDQUFHQSxDQUFDRyx5QkFBeUIsRUFBRTtJQUN6RkMsTUFBTTtRQUFFQyxnQkFBZ0I7SUFBTTtJQUM5QkMsSUFBSTtRQUFFQyxRQUFRO0lBQVM7QUFDekIsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx5YWZpN1xcRGVza3RvcFxcYzBtcGlsZWRcXGxpYlxcc3VwYWJhc2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuaW1wb3J0IHsgZW52IH0gZnJvbSBcIi4vZW52XCI7XG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQ2xpZW50KGVudi5TVVBBQkFTRV9VUkwsIGVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZLCB7XG4gIGF1dGg6IHsgcGVyc2lzdFNlc3Npb246IGZhbHNlIH0sXG4gIGRiOiB7IHNjaGVtYTogXCJwdWJsaWNcIiB9XG59KTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJlbnYiLCJzdXBhYmFzZUFkbWluIiwiU1VQQUJBU0VfVVJMIiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsImF1dGgiLCJwZXJzaXN0U2Vzc2lvbiIsImRiIiwic2NoZW1hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/request-meta */ \"(rsc)/./node_modules/next/dist/server/request-meta.js\");\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/server/lib/trace/tracer */ \"(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js\");\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/shared/lib/router/utils/app-paths */ \"next/dist/shared/lib/router/utils/app-paths\");\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/server/base-http/node */ \"(rsc)/./node_modules/next/dist/server/base-http/node.js\");\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/server/web/spec-extension/adapters/next-request */ \"(rsc)/./node_modules/next/dist/server/web/spec-extension/adapters/next-request.js\");\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/server/lib/trace/constants */ \"(rsc)/./node_modules/next/dist/server/lib/trace/constants.js\");\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/dist/server/instrumentation/utils */ \"(rsc)/./node_modules/next/dist/server/instrumentation/utils.js\");\n/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/server/send-response */ \"(rsc)/./node_modules/next/dist/server/send-response.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/server/web/utils */ \"(rsc)/./node_modules/next/dist/server/web/utils.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/dist/server/lib/cache-control */ \"(rsc)/./node_modules/next/dist/server/lib/cache-control.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/lib/constants */ \"(rsc)/./node_modules/next/dist/lib/constants.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/shared/lib/no-fallback-error.external */ \"next/dist/shared/lib/no-fallback-error.external\");\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/dist/server/response-cache */ \"(rsc)/./node_modules/next/dist/server/response-cache/index.js\");\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var C_Users_yafi7_Desktop_c0mpiled_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    distDir: \".next\" || 0,\n    relativeProjectDir:  false || '',\n    resolvedPagePath: \"C:\\\\Users\\\\yafi7\\\\Desktop\\\\c0mpiled\\\\app\\\\api\\\\upload\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_yafi7_Desktop_c0mpiled_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_16__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\nasync function handler(req, res, ctx) {\n    var _nextConfig_experimental;\n    let srcPage = \"/api/upload/route\";\n    // turbopack doesn't normalize `/index` in the page name\n    // so we need to to process dynamic routes properly\n    // TODO: fix turbopack providing differing value from webpack\n    if (false) {} else if (srcPage === '/index') {\n        // we always normalize /index specifically\n        srcPage = '/';\n    }\n    const multiZoneDraftMode = false;\n    const prepareResult = await routeModule.prepare(req, res, {\n        srcPage,\n        multiZoneDraftMode\n    });\n    if (!prepareResult) {\n        res.statusCode = 400;\n        res.end('Bad Request');\n        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());\n        return null;\n    }\n    const { buildId, params, nextConfig, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname } = prepareResult;\n    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__.normalizeAppPath)(srcPage);\n    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);\n    if (isIsr && !isDraftMode) {\n        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);\n        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];\n        if (prerenderInfo) {\n            if (prerenderInfo.fallback === false && !isPrerendered) {\n                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError();\n            }\n        }\n    }\n    let cacheKey = null;\n    if (isIsr && !routeModule.isDev && !isDraftMode) {\n        cacheKey = resolvedPathname;\n        // ensure /index and / is normalized to one key\n        cacheKey = cacheKey === '/index' ? '/' : cacheKey;\n    }\n    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML\n    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports\n    // dynamic HTML.\n    !isIsr;\n    // This is a revalidation request if the request is for a static\n    // page and it is not being resumed from a postponed render and\n    // it is not a dynamic RSC request then it is a revalidation\n    // request.\n    const isRevalidate = isIsr && !supportsDynamicResponse;\n    const method = req.method || 'GET';\n    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();\n    const activeSpan = tracer.getActiveScopeSpan();\n    const context = {\n        params,\n        prerenderManifest,\n        renderOpts: {\n            experimental: {\n                cacheComponents: Boolean(nextConfig.experimental.cacheComponents),\n                authInterrupts: Boolean(nextConfig.experimental.authInterrupts)\n            },\n            supportsDynamicResponse,\n            incrementalCache: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache'),\n            cacheLifeProfiles: (_nextConfig_experimental = nextConfig.experimental) == null ? void 0 : _nextConfig_experimental.cacheLife,\n            isRevalidate,\n            waitUntil: ctx.waitUntil,\n            onClose: (cb)=>{\n                res.on('close', cb);\n            },\n            onAfterTaskError: undefined,\n            onInstrumentationRequestError: (error, _request, errorContext)=>routeModule.onRequestError(req, error, errorContext, routerServerContext)\n        },\n        sharedContext: {\n            buildId\n        }\n    };\n    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextRequest(req);\n    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextResponse(res);\n    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.signalFromNodeResponse)(res));\n    try {\n        const invokeRouteModule = async (span)=>{\n            return routeModule.handle(nextReq, context).finally(()=>{\n                if (!span) return;\n                span.setAttributes({\n                    'http.status_code': res.statusCode,\n                    'next.rsc': false\n                });\n                const rootSpanAttributes = tracer.getRootSpanAttributes();\n                // We were unable to get attributes, probably OTEL is not enabled\n                if (!rootSpanAttributes) {\n                    return;\n                }\n                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest) {\n                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);\n                    return;\n                }\n                const route = rootSpanAttributes.get('next.route');\n                if (route) {\n                    const name = `${method} ${route}`;\n                    span.setAttributes({\n                        'next.route': route,\n                        'http.route': route,\n                        'next.span_name': name\n                    });\n                    span.updateName(name);\n                } else {\n                    span.updateName(`${method} ${req.url}`);\n                }\n            });\n        };\n        const handleResponse = async (currentSpan)=>{\n            var _cacheEntry_value;\n            const responseGenerator = async ({ previousCacheEntry })=>{\n                try {\n                    if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {\n                        res.statusCode = 404;\n                        // on-demand revalidate always sets this header\n                        res.setHeader('x-nextjs-cache', 'REVALIDATED');\n                        res.end('This page could not be found');\n                        return null;\n                    }\n                    const response = await invokeRouteModule(currentSpan);\n                    req.fetchMetrics = context.renderOpts.fetchMetrics;\n                    let pendingWaitUntil = context.renderOpts.pendingWaitUntil;\n                    // Attempt using provided waitUntil if available\n                    // if it's not we fallback to sendResponse's handling\n                    if (pendingWaitUntil) {\n                        if (ctx.waitUntil) {\n                            ctx.waitUntil(pendingWaitUntil);\n                            pendingWaitUntil = undefined;\n                        }\n                    }\n                    const cacheTags = context.renderOpts.collectedTags;\n                    // If the request is for a static response, we can cache it so long\n                    // as it's not edge.\n                    if (isIsr) {\n                        const blob = await response.blob();\n                        // Copy the headers from the response.\n                        const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.toNodeOutgoingHttpHeaders)(response.headers);\n                        if (cacheTags) {\n                            headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER] = cacheTags;\n                        }\n                        if (!headers['content-type'] && blob.type) {\n                            headers['content-type'] = blob.type;\n                        }\n                        const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;\n                        const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? undefined : context.renderOpts.collectedExpire;\n                        // Create the cache entry for the response.\n                        const cacheEntry = {\n                            value: {\n                                kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE,\n                                status: response.status,\n                                body: Buffer.from(await blob.arrayBuffer()),\n                                headers\n                            },\n                            cacheControl: {\n                                revalidate,\n                                expire\n                            }\n                        };\n                        return cacheEntry;\n                    } else {\n                        // send response without caching if not ISR\n                        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, response, context.renderOpts.pendingWaitUntil);\n                        return null;\n                    }\n                } catch (err) {\n                    // if this is a background revalidate we need to report\n                    // the request error here as it won't be bubbled\n                    if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {\n                        await routeModule.onRequestError(req, err, {\n                            routerKind: 'App Router',\n                            routePath: srcPage,\n                            routeType: 'route',\n                            revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                                isRevalidate,\n                                isOnDemandRevalidate\n                            })\n                        }, routerServerContext);\n                    }\n                    throw err;\n                }\n            };\n            const cacheEntry = await routeModule.handleResponse({\n                req,\n                nextConfig,\n                cacheKey,\n                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n                isFallback: false,\n                prerenderManifest,\n                isRoutePPREnabled: false,\n                isOnDemandRevalidate,\n                revalidateOnlyGenerated,\n                responseGenerator,\n                waitUntil: ctx.waitUntil\n            });\n            // we don't create a cacheEntry for ISR\n            if (!isIsr) {\n                return null;\n            }\n            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE) {\n                var _cacheEntry_value1;\n                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), \"__NEXT_ERROR_CODE\", {\n                    value: \"E701\",\n                    enumerable: false,\n                    configurable: true\n                });\n            }\n            if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode')) {\n                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');\n            }\n            // Draft mode should never be cached\n            if (isDraftMode) {\n                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');\n            }\n            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);\n            if (!((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isIsr)) {\n                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER);\n            }\n            // If cache control is already set on the response we don't\n            // override it to allow users to customize it via next.config\n            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {\n                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__.getCacheControlHeader)(cacheEntry.cacheControl));\n            }\n            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(cacheEntry.value.body, {\n                headers,\n                status: cacheEntry.value.status || 200\n            }));\n            return null;\n        };\n        // TODO: activeSpan code path is for when wrapped by\n        // next-server can be removed when this is no longer used\n        if (activeSpan) {\n            await handleResponse(activeSpan);\n        } else {\n            await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest, {\n                    spanName: `${method} ${req.url}`,\n                    kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,\n                    attributes: {\n                        'http.method': method,\n                        'http.target': req.url\n                    }\n                }, handleResponse));\n        }\n    } catch (err) {\n        if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError)) {\n            await routeModule.onRequestError(req, err, {\n                routerKind: 'App Router',\n                routePath: normalizedSrcPage,\n                routeType: 'route',\n                revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                    isRevalidate,\n                    isOnDemandRevalidate\n                })\n            });\n        }\n        // rethrow so that we can handle serving error page\n        // If this is during static generation, throw the error again.\n        if (isIsr) throw err;\n        // Otherwise, send a 500 response.\n        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(null, {\n            status: 500\n        }));\n        return null;\n    }\n}\n\n//# sourceMappingURL=app-route.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN5YWZpNyU1Q0Rlc2t0b3AlNUNjMG1waWxlZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDeWFmaTclNUNEZXNrdG9wJTVDYzBtcGlsZWQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QmaXNHbG9iYWxOb3RGb3VuZEVuYWJsZWQ9ISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNkO0FBQ1M7QUFDTztBQUNLO0FBQ21DO0FBQ2pEO0FBQ087QUFDZjtBQUNzQztBQUN6QjtBQUNNO0FBQ0M7QUFDaEI7QUFDMEI7QUFDNUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsYUFBYSxPQUFvQyxJQUFJLENBQUU7QUFDdkQsd0JBQXdCLE1BQXVDO0FBQy9EO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGO0FBQ25GO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsS0FBcUIsRUFBRSxFQUUxQixDQUFDO0FBQ047QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQXdDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9KQUFvSjtBQUNoSyw4QkFBOEIsNkZBQWdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw2RkFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0RUFBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsOEJBQThCLDZFQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw0RUFBZTtBQUMzQyw0QkFBNEIsNkVBQWdCO0FBQzVDLG9CQUFvQix5R0FBa0Isa0NBQWtDLGlIQUFzQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGdGQUFjO0FBQy9FLCtEQUErRCx5Q0FBeUM7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUSxFQUFFLE1BQU07QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxrQkFBa0I7QUFDbEIsdUNBQXVDLFFBQVEsRUFBRSxRQUFRO0FBQ3pEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxvQkFBb0I7QUFDbkU7QUFDQSx5QkFBeUIsNkVBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxzRkFBeUI7QUFDakU7QUFDQSxvQ0FBb0MsNEVBQXNCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLG9FQUFjO0FBQ3BLLDBJQUEwSSxvRUFBYztBQUN4SjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsNkVBQWU7QUFDckQ7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLDhCQUE4Qiw2RUFBWTtBQUMxQztBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLDJGQUFtQjtBQUNqRTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtFQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUlBQXFJLDZFQUFlO0FBQ3BKO0FBQ0EsMkdBQTJHLGlIQUFpSDtBQUM1TjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsNkVBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdGQUEyQjtBQUN2RCxrQkFBa0IsNkVBQWM7QUFDaEMsK0JBQStCLDRFQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwRkFBcUI7QUFDbEU7QUFDQSxrQkFBa0IsNkVBQVk7QUFDOUI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNkVBQTZFLGdGQUFjO0FBQzNGLGlDQUFpQyxRQUFRLEVBQUUsUUFBUTtBQUNuRCwwQkFBMEIsdUVBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxNQUFNO0FBQ04sNkJBQTZCLDZGQUFlO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDJGQUFtQjtBQUNyRDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2RUFBWTtBQUMxQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgeyBnZXRSZXF1ZXN0TWV0YSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JlcXVlc3QtbWV0YVwiO1xuaW1wb3J0IHsgZ2V0VHJhY2VyLCBTcGFuS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi90cmFjZS90cmFjZXJcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUFwcFBhdGggfSBmcm9tIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2FwcC1wYXRoc1wiO1xuaW1wb3J0IHsgTm9kZU5leHRSZXF1ZXN0LCBOb2RlTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvYmFzZS1odHRwL25vZGVcIjtcbmltcG9ydCB7IE5leHRSZXF1ZXN0QWRhcHRlciwgc2lnbmFsRnJvbU5vZGVSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3dlYi9zcGVjLWV4dGVuc2lvbi9hZGFwdGVycy9uZXh0LXJlcXVlc3RcIjtcbmltcG9ydCB7IEJhc2VTZXJ2ZXJTcGFuIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3RyYWNlL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0UmV2YWxpZGF0ZVJlYXNvbiB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2luc3RydW1lbnRhdGlvbi91dGlsc1wiO1xuaW1wb3J0IHsgc2VuZFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvc2VuZC1yZXNwb25zZVwiO1xuaW1wb3J0IHsgZnJvbU5vZGVPdXRnb2luZ0h0dHBIZWFkZXJzLCB0b05vZGVPdXRnb2luZ0h0dHBIZWFkZXJzIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvd2ViL3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRDYWNoZUNvbnRyb2xIZWFkZXIgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvY2FjaGUtY29udHJvbFwiO1xuaW1wb3J0IHsgSU5GSU5JVEVfQ0FDSEUsIE5FWFRfQ0FDSEVfVEFHU19IRUFERVIgfSBmcm9tIFwibmV4dC9kaXN0L2xpYi9jb25zdGFudHNcIjtcbmltcG9ydCB7IE5vRmFsbGJhY2tFcnJvciB9IGZyb20gXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9uby1mYWxsYmFjay1lcnJvci5leHRlcm5hbFwiO1xuaW1wb3J0IHsgQ2FjaGVkUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcmVzcG9uc2UtY2FjaGVcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFx5YWZpN1xcXFxEZXNrdG9wXFxcXGMwbXBpbGVkXFxcXGFwcFxcXFxhcGlcXFxcdXBsb2FkXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91cGxvYWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91cGxvYWRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZC9yb3V0ZVwiXG4gICAgfSxcbiAgICBkaXN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfRElTVF9ESVIgfHwgJycsXG4gICAgcmVsYXRpdmVQcm9qZWN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfUFJPSkVDVF9ESVIgfHwgJycsXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFx5YWZpN1xcXFxEZXNrdG9wXFxcXGMwbXBpbGVkXFxcXGFwcFxcXFxhcGlcXFxcdXBsb2FkXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMsIGN0eCkge1xuICAgIHZhciBfbmV4dENvbmZpZ19leHBlcmltZW50YWw7XG4gICAgbGV0IHNyY1BhZ2UgPSBcIi9hcGkvdXBsb2FkL3JvdXRlXCI7XG4gICAgLy8gdHVyYm9wYWNrIGRvZXNuJ3Qgbm9ybWFsaXplIGAvaW5kZXhgIGluIHRoZSBwYWdlIG5hbWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHRvIHByb2Nlc3MgZHluYW1pYyByb3V0ZXMgcHJvcGVybHlcbiAgICAvLyBUT0RPOiBmaXggdHVyYm9wYWNrIHByb3ZpZGluZyBkaWZmZXJpbmcgdmFsdWUgZnJvbSB3ZWJwYWNrXG4gICAgaWYgKHByb2Nlc3MuZW52LlRVUkJPUEFDSykge1xuICAgICAgICBzcmNQYWdlID0gc3JjUGFnZS5yZXBsYWNlKC9cXC9pbmRleCQvLCAnJykgfHwgJy8nO1xuICAgIH0gZWxzZSBpZiAoc3JjUGFnZSA9PT0gJy9pbmRleCcpIHtcbiAgICAgICAgLy8gd2UgYWx3YXlzIG5vcm1hbGl6ZSAvaW5kZXggc3BlY2lmaWNhbGx5XG4gICAgICAgIHNyY1BhZ2UgPSAnLyc7XG4gICAgfVxuICAgIGNvbnN0IG11bHRpWm9uZURyYWZ0TW9kZSA9IHByb2Nlc3MuZW52Ll9fTkVYVF9NVUxUSV9aT05FX0RSQUZUX01PREU7XG4gICAgY29uc3QgcHJlcGFyZVJlc3VsdCA9IGF3YWl0IHJvdXRlTW9kdWxlLnByZXBhcmUocmVxLCByZXMsIHtcbiAgICAgICAgc3JjUGFnZSxcbiAgICAgICAgbXVsdGlab25lRHJhZnRNb2RlXG4gICAgfSk7XG4gICAgaWYgKCFwcmVwYXJlUmVzdWx0KSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICByZXMuZW5kKCdCYWQgUmVxdWVzdCcpO1xuICAgICAgICBjdHgud2FpdFVudGlsID09IG51bGwgPyB2b2lkIDAgOiBjdHgud2FpdFVudGlsLmNhbGwoY3R4LCBQcm9taXNlLnJlc29sdmUoKSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7IGJ1aWxkSWQsIHBhcmFtcywgbmV4dENvbmZpZywgaXNEcmFmdE1vZGUsIHByZXJlbmRlck1hbmlmZXN0LCByb3V0ZXJTZXJ2ZXJDb250ZXh0LCBpc09uRGVtYW5kUmV2YWxpZGF0ZSwgcmV2YWxpZGF0ZU9ubHlHZW5lcmF0ZWQsIHJlc29sdmVkUGF0aG5hbWUgfSA9IHByZXBhcmVSZXN1bHQ7XG4gICAgY29uc3Qgbm9ybWFsaXplZFNyY1BhZ2UgPSBub3JtYWxpemVBcHBQYXRoKHNyY1BhZ2UpO1xuICAgIGxldCBpc0lzciA9IEJvb2xlYW4ocHJlcmVuZGVyTWFuaWZlc3QuZHluYW1pY1JvdXRlc1tub3JtYWxpemVkU3JjUGFnZV0gfHwgcHJlcmVuZGVyTWFuaWZlc3Qucm91dGVzW3Jlc29sdmVkUGF0aG5hbWVdKTtcbiAgICBpZiAoaXNJc3IgJiYgIWlzRHJhZnRNb2RlKSB7XG4gICAgICAgIGNvbnN0IGlzUHJlcmVuZGVyZWQgPSBCb29sZWFuKHByZXJlbmRlck1hbmlmZXN0LnJvdXRlc1tyZXNvbHZlZFBhdGhuYW1lXSk7XG4gICAgICAgIGNvbnN0IHByZXJlbmRlckluZm8gPSBwcmVyZW5kZXJNYW5pZmVzdC5keW5hbWljUm91dGVzW25vcm1hbGl6ZWRTcmNQYWdlXTtcbiAgICAgICAgaWYgKHByZXJlbmRlckluZm8pIHtcbiAgICAgICAgICAgIGlmIChwcmVyZW5kZXJJbmZvLmZhbGxiYWNrID09PSBmYWxzZSAmJiAhaXNQcmVyZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb0ZhbGxiYWNrRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgY2FjaGVLZXkgPSBudWxsO1xuICAgIGlmIChpc0lzciAmJiAhcm91dGVNb2R1bGUuaXNEZXYgJiYgIWlzRHJhZnRNb2RlKSB7XG4gICAgICAgIGNhY2hlS2V5ID0gcmVzb2x2ZWRQYXRobmFtZTtcbiAgICAgICAgLy8gZW5zdXJlIC9pbmRleCBhbmQgLyBpcyBub3JtYWxpemVkIHRvIG9uZSBrZXlcbiAgICAgICAgY2FjaGVLZXkgPSBjYWNoZUtleSA9PT0gJy9pbmRleCcgPyAnLycgOiBjYWNoZUtleTtcbiAgICB9XG4gICAgY29uc3Qgc3VwcG9ydHNEeW5hbWljUmVzcG9uc2UgPSAvLyBJZiB3ZSdyZSBpbiBkZXZlbG9wbWVudCwgd2UgYWx3YXlzIHN1cHBvcnQgZHluYW1pYyBIVE1MXG4gICAgcm91dGVNb2R1bGUuaXNEZXYgPT09IHRydWUgfHwgLy8gSWYgdGhpcyBpcyBub3QgU1NHIG9yIGRvZXMgbm90IGhhdmUgc3RhdGljIHBhdGhzLCB0aGVuIGl0IHN1cHBvcnRzXG4gICAgLy8gZHluYW1pYyBIVE1MLlxuICAgICFpc0lzcjtcbiAgICAvLyBUaGlzIGlzIGEgcmV2YWxpZGF0aW9uIHJlcXVlc3QgaWYgdGhlIHJlcXVlc3QgaXMgZm9yIGEgc3RhdGljXG4gICAgLy8gcGFnZSBhbmQgaXQgaXMgbm90IGJlaW5nIHJlc3VtZWQgZnJvbSBhIHBvc3Rwb25lZCByZW5kZXIgYW5kXG4gICAgLy8gaXQgaXMgbm90IGEgZHluYW1pYyBSU0MgcmVxdWVzdCB0aGVuIGl0IGlzIGEgcmV2YWxpZGF0aW9uXG4gICAgLy8gcmVxdWVzdC5cbiAgICBjb25zdCBpc1JldmFsaWRhdGUgPSBpc0lzciAmJiAhc3VwcG9ydHNEeW5hbWljUmVzcG9uc2U7XG4gICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCAnR0VUJztcbiAgICBjb25zdCB0cmFjZXIgPSBnZXRUcmFjZXIoKTtcbiAgICBjb25zdCBhY3RpdmVTcGFuID0gdHJhY2VyLmdldEFjdGl2ZVNjb3BlU3BhbigpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcHJlcmVuZGVyTWFuaWZlc3QsXG4gICAgICAgIHJlbmRlck9wdHM6IHtcbiAgICAgICAgICAgIGV4cGVyaW1lbnRhbDoge1xuICAgICAgICAgICAgICAgIGNhY2hlQ29tcG9uZW50czogQm9vbGVhbihuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbC5jYWNoZUNvbXBvbmVudHMpLFxuICAgICAgICAgICAgICAgIGF1dGhJbnRlcnJ1cHRzOiBCb29sZWFuKG5leHRDb25maWcuZXhwZXJpbWVudGFsLmF1dGhJbnRlcnJ1cHRzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlLFxuICAgICAgICAgICAgaW5jcmVtZW50YWxDYWNoZTogZ2V0UmVxdWVzdE1ldGEocmVxLCAnaW5jcmVtZW50YWxDYWNoZScpLFxuICAgICAgICAgICAgY2FjaGVMaWZlUHJvZmlsZXM6IChfbmV4dENvbmZpZ19leHBlcmltZW50YWwgPSBuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9uZXh0Q29uZmlnX2V4cGVyaW1lbnRhbC5jYWNoZUxpZmUsXG4gICAgICAgICAgICBpc1JldmFsaWRhdGUsXG4gICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWwsXG4gICAgICAgICAgICBvbkNsb3NlOiAoY2IpPT57XG4gICAgICAgICAgICAgICAgcmVzLm9uKCdjbG9zZScsIGNiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFmdGVyVGFza0Vycm9yOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbkluc3RydW1lbnRhdGlvblJlcXVlc3RFcnJvcjogKGVycm9yLCBfcmVxdWVzdCwgZXJyb3JDb250ZXh0KT0+cm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnJvciwgZXJyb3JDb250ZXh0LCByb3V0ZXJTZXJ2ZXJDb250ZXh0KVxuICAgICAgICB9LFxuICAgICAgICBzaGFyZWRDb250ZXh0OiB7XG4gICAgICAgICAgICBidWlsZElkXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG5vZGVOZXh0UmVxID0gbmV3IE5vZGVOZXh0UmVxdWVzdChyZXEpO1xuICAgIGNvbnN0IG5vZGVOZXh0UmVzID0gbmV3IE5vZGVOZXh0UmVzcG9uc2UocmVzKTtcbiAgICBjb25zdCBuZXh0UmVxID0gTmV4dFJlcXVlc3RBZGFwdGVyLmZyb21Ob2RlTmV4dFJlcXVlc3Qobm9kZU5leHRSZXEsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UocmVzKSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW52b2tlUm91dGVNb2R1bGUgPSBhc3luYyAoc3Bhbik9PntcbiAgICAgICAgICAgIHJldHVybiByb3V0ZU1vZHVsZS5oYW5kbGUobmV4dFJlcSwgY29udGV4dCkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgIGlmICghc3BhbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgICAgICdodHRwLnN0YXR1c19jb2RlJzogcmVzLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgICduZXh0LnJzYyc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFNwYW5BdHRyaWJ1dGVzID0gdHJhY2VyLmdldFJvb3RTcGFuQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIC8vIFdlIHdlcmUgdW5hYmxlIHRvIGdldCBhdHRyaWJ1dGVzLCBwcm9iYWJseSBPVEVMIGlzIG5vdCBlbmFibGVkXG4gICAgICAgICAgICAgICAgaWYgKCFyb290U3BhbkF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKSAhPT0gQmFzZVNlcnZlclNwYW4uaGFuZGxlUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgcm9vdCBzcGFuIHR5cGUgJyR7cm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKX0nLiBQbGVhc2UgcmVwb3J0IHRoaXMgTmV4dC5qcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsL25leHQuanNgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZSA9IHJvb3RTcGFuQXR0cmlidXRlcy5nZXQoJ25leHQucm91dGUnKTtcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke21ldGhvZH0gJHtyb3V0ZX1gO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25leHQucm91dGUnOiByb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwLnJvdXRlJzogcm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmV4dC5zcGFuX25hbWUnOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnVwZGF0ZU5hbWUobmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi51cGRhdGVOYW1lKGAke21ldGhvZH0gJHtyZXEudXJsfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBoYW5kbGVSZXNwb25zZSA9IGFzeW5jIChjdXJyZW50U3Bhbik9PntcbiAgICAgICAgICAgIHZhciBfY2FjaGVFbnRyeV92YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlR2VuZXJhdG9yID0gYXN5bmMgKHsgcHJldmlvdXNDYWNoZUVudHJ5IH0pPT57XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnZXRSZXF1ZXN0TWV0YShyZXEsICdtaW5pbWFsTW9kZScpICYmIGlzT25EZW1hbmRSZXZhbGlkYXRlICYmIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkICYmICFwcmV2aW91c0NhY2hlRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24tZGVtYW5kIHJldmFsaWRhdGUgYWx3YXlzIHNldHMgdGhpcyBoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtbmV4dGpzLWNhY2hlJywgJ1JFVkFMSURBVEVEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZW5kKCdUaGlzIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGludm9rZVJvdXRlTW9kdWxlKGN1cnJlbnRTcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZldGNoTWV0cmljcyA9IGNvbnRleHQucmVuZGVyT3B0cy5mZXRjaE1ldHJpY3M7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZW5kaW5nV2FpdFVudGlsID0gY29udGV4dC5yZW5kZXJPcHRzLnBlbmRpbmdXYWl0VW50aWw7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdXNpbmcgcHJvdmlkZWQgd2FpdFVudGlsIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCB3ZSBmYWxsYmFjayB0byBzZW5kUmVzcG9uc2UncyBoYW5kbGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVuZGluZ1dhaXRVbnRpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC53YWl0VW50aWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgud2FpdFVudGlsKHBlbmRpbmdXYWl0VW50aWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdXYWl0VW50aWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVUYWdzID0gY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFRhZ3M7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IGlzIGZvciBhIHN0YXRpYyByZXNwb25zZSwgd2UgY2FuIGNhY2hlIGl0IHNvIGxvbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgaXQncyBub3QgZWRnZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSXNyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29weSB0aGUgaGVhZGVycyBmcm9tIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0b05vZGVPdXRnb2luZ0h0dHBIZWFkZXJzKHJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlVGFncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbTkVYVF9DQUNIRV9UQUdTX0hFQURFUl0gPSBjYWNoZVRhZ3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddICYmIGJsb2IudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gYmxvYi50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2YWxpZGF0ZSA9IHR5cGVvZiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkUmV2YWxpZGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFJldmFsaWRhdGUgPj0gSU5GSU5JVEVfQ0FDSEUgPyBmYWxzZSA6IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRSZXZhbGlkYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJlID0gdHlwZW9mIGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmUgPT09ICd1bmRlZmluZWQnIHx8IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmUgPj0gSU5GSU5JVEVfQ0FDSEUgPyB1bmRlZmluZWQgOiBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkRXhwaXJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjYWNoZSBlbnRyeSBmb3IgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiBDYWNoZWRSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogQnVmZmVyLmZyb20oYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVDb250cm9sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVFbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgcmVzcG9uc2Ugd2l0aG91dCBjYWNoaW5nIGlmIG5vdCBJU1JcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHNlbmRSZXNwb25zZShub2RlTmV4dFJlcSwgbm9kZU5leHRSZXMsIHJlc3BvbnNlLCBjb250ZXh0LnJlbmRlck9wdHMucGVuZGluZ1dhaXRVbnRpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgYmFja2dyb3VuZCByZXZhbGlkYXRlIHdlIG5lZWQgdG8gcmVwb3J0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSByZXF1ZXN0IGVycm9yIGhlcmUgYXMgaXQgd29uJ3QgYmUgYnViYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNDYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiBwcmV2aW91c0NhY2hlRW50cnkuaXNTdGFsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJLaW5kOiAnQXBwIFJvdXRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVQYXRoOiBzcmNQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3JvdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiBnZXRSZXZhbGlkYXRlUmVhc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCByb3V0ZXJTZXJ2ZXJDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlRW50cnkgPSBhd2FpdCByb3V0ZU1vZHVsZS5oYW5kbGVSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgcmVxLFxuICAgICAgICAgICAgICAgIG5leHRDb25maWcsXG4gICAgICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICAgICAgcm91dGVLaW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICAgICAgICAgIGlzRmFsbGJhY2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXJlbmRlck1hbmlmZXN0LFxuICAgICAgICAgICAgICAgIGlzUm91dGVQUFJFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlT25seUdlbmVyYXRlZCxcbiAgICAgICAgICAgICAgICByZXNwb25zZUdlbmVyYXRvcixcbiAgICAgICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgY3JlYXRlIGEgY2FjaGVFbnRyeSBmb3IgSVNSXG4gICAgICAgICAgICBpZiAoIWlzSXNyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGNhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IChfY2FjaGVFbnRyeV92YWx1ZSA9IGNhY2hlRW50cnkudmFsdWUpID09IG51bGwgPyB2b2lkIDAgOiBfY2FjaGVFbnRyeV92YWx1ZS5raW5kKSAhPT0gQ2FjaGVkUm91dGVLaW5kLkFQUF9ST1VURSkge1xuICAgICAgICAgICAgICAgIHZhciBfY2FjaGVFbnRyeV92YWx1ZTE7XG4gICAgICAgICAgICAgICAgdGhyb3cgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ldyBFcnJvcihgSW52YXJpYW50OiBhcHAtcm91dGUgcmVjZWl2ZWQgaW52YWxpZCBjYWNoZSBlbnRyeSAke2NhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IChfY2FjaGVFbnRyeV92YWx1ZTEgPSBjYWNoZUVudHJ5LnZhbHVlKSA9PSBudWxsID8gdm9pZCAwIDogX2NhY2hlRW50cnlfdmFsdWUxLmtpbmR9YCksIFwiX19ORVhUX0VSUk9SX0NPREVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJFNzAxXCIsXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2V0UmVxdWVzdE1ldGEocmVxLCAnbWluaW1hbE1vZGUnKSkge1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtbmV4dGpzLWNhY2hlJywgaXNPbkRlbWFuZFJldmFsaWRhdGUgPyAnUkVWQUxJREFURUQnIDogY2FjaGVFbnRyeS5pc01pc3MgPyAnTUlTUycgOiBjYWNoZUVudHJ5LmlzU3RhbGUgPyAnU1RBTEUnIDogJ0hJVCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRHJhZnQgbW9kZSBzaG91bGQgbmV2ZXIgYmUgY2FjaGVkXG4gICAgICAgICAgICBpZiAoaXNEcmFmdE1vZGUpIHtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3ByaXZhdGUsIG5vLWNhY2hlLCBuby1zdG9yZSwgbWF4LWFnZT0wLCBtdXN0LXJldmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBmcm9tTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMoY2FjaGVFbnRyeS52YWx1ZS5oZWFkZXJzKTtcbiAgICAgICAgICAgIGlmICghKGdldFJlcXVlc3RNZXRhKHJlcSwgJ21pbmltYWxNb2RlJykgJiYgaXNJc3IpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5kZWxldGUoTkVYVF9DQUNIRV9UQUdTX0hFQURFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBjYWNoZSBjb250cm9sIGlzIGFscmVhZHkgc2V0IG9uIHRoZSByZXNwb25zZSB3ZSBkb24ndFxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUgaXQgdG8gYWxsb3cgdXNlcnMgdG8gY3VzdG9taXplIGl0IHZpYSBuZXh0LmNvbmZpZ1xuICAgICAgICAgICAgaWYgKGNhY2hlRW50cnkuY2FjaGVDb250cm9sICYmICFyZXMuZ2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJykgJiYgIWhlYWRlcnMuZ2V0KCdDYWNoZS1Db250cm9sJykpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnNldCgnQ2FjaGUtQ29udHJvbCcsIGdldENhY2hlQ29udHJvbEhlYWRlcihjYWNoZUVudHJ5LmNhY2hlQ29udHJvbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgbmV3IFJlc3BvbnNlKGNhY2hlRW50cnkudmFsdWUuYm9keSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBjYWNoZUVudHJ5LnZhbHVlLnN0YXR1cyB8fCAyMDBcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyBUT0RPOiBhY3RpdmVTcGFuIGNvZGUgcGF0aCBpcyBmb3Igd2hlbiB3cmFwcGVkIGJ5XG4gICAgICAgIC8vIG5leHQtc2VydmVyIGNhbiBiZSByZW1vdmVkIHdoZW4gdGhpcyBpcyBubyBsb25nZXIgdXNlZFxuICAgICAgICBpZiAoYWN0aXZlU3Bhbikge1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlUmVzcG9uc2UoYWN0aXZlU3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0cmFjZXIud2l0aFByb3BhZ2F0ZWRDb250ZXh0KHJlcS5oZWFkZXJzLCAoKT0+dHJhY2VyLnRyYWNlKEJhc2VTZXJ2ZXJTcGFuLmhhbmRsZVJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbk5hbWU6IGAke21ldGhvZH0gJHtyZXEudXJsfWAsXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IFNwYW5LaW5kLlNFUlZFUixcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAubWV0aG9kJzogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAudGFyZ2V0JzogcmVxLnVybFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgaGFuZGxlUmVzcG9uc2UpKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoIShlcnIgaW5zdGFuY2VvZiBOb0ZhbGxiYWNrRXJyb3IpKSB7XG4gICAgICAgICAgICBhd2FpdCByb3V0ZU1vZHVsZS5vblJlcXVlc3RFcnJvcihyZXEsIGVyciwge1xuICAgICAgICAgICAgICAgIHJvdXRlcktpbmQ6ICdBcHAgUm91dGVyJyxcbiAgICAgICAgICAgICAgICByb3V0ZVBhdGg6IG5vcm1hbGl6ZWRTcmNQYWdlLFxuICAgICAgICAgICAgICAgIHJvdXRlVHlwZTogJ3JvdXRlJyxcbiAgICAgICAgICAgICAgICByZXZhbGlkYXRlUmVhc29uOiBnZXRSZXZhbGlkYXRlUmVhc29uKHtcbiAgICAgICAgICAgICAgICAgICAgaXNSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICBpc09uRGVtYW5kUmV2YWxpZGF0ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXRocm93IHNvIHRoYXQgd2UgY2FuIGhhbmRsZSBzZXJ2aW5nIGVycm9yIHBhZ2VcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBkdXJpbmcgc3RhdGljIGdlbmVyYXRpb24sIHRocm93IHRoZSBlcnJvciBhZ2Fpbi5cbiAgICAgICAgaWYgKGlzSXNyKSB0aHJvdyBlcnI7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgc2VuZCBhIDUwMCByZXNwb25zZS5cbiAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgbmV3IFJlc3BvbnNlKG51bGwsIHtcbiAgICAgICAgICAgIHN0YXR1czogNTAwXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "./work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "async_hooks":
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "console":
/*!**************************!*\
  !*** external "console" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("console");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "diagnostics_channel":
/*!**************************************!*\
  !*** external "diagnostics_channel" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("diagnostics_channel");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "next/dist/shared/lib/no-fallback-error.external":
/*!******************************************************************!*\
  !*** external "next/dist/shared/lib/no-fallback-error.external" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ }),

/***/ "next/dist/shared/lib/router/utils/app-paths":
/*!**************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/app-paths" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "stream/web":
/*!*****************************!*\
  !*** external "stream/web" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream/web");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "util/types":
/*!*****************************!*\
  !*** external "util/types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("util/types");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/zod","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/undici","vendor-chunks/@fastify","vendor-chunks/@vercel","vendor-chunks/retry","vendor-chunks/bytes","vendor-chunks/async-retry","vendor-chunks/is-plain-object","vendor-chunks/is-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cyafi7%5CDesktop%5Cc0mpiled&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();