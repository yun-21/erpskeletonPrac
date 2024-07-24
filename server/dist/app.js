"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var pg_1 = require("pg");
dotenv.config({ path: "".concat(__dirname, "/../../.env") });
var pool = new pg_1.Pool({
    user: "postgres",
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432
});
var port = process.env.PORT || 3001; // 기본 포트 설정 추가
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../../client/dist')));
app.get('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("\n      SELECT column_name\n      FROM information_schema.columns\n      WHERE table_name = 'user_test'\n      AND column_name NOT IN ('id')\n    ")];
            case 1:
                result = _a.sent();
                console.log(result.rows); // 데이터 확인을 위해 로그 출력
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching users:', error_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/send', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, birth, join, address, phonenumber, password, name, values, client, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, birth = _a.birth, join = _a.join, address = _a.address, phonenumber = _a.phonenumber, password = _a.password, name = _a.name;
                values = [birth, join, address, phonenumber, password, name];
                return [4 /*yield*/, pool.connect()];
            case 1:
                client = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, client.query('INSERT INTO user_test(birth, "join", address, phonenumber, password, name) VALUES($1,$2,$3,$4,$5,$6)', values)];
            case 3:
                _b.sent();
                console.log("'".concat(values, "' \uCD94\uAC00 \uC644\uB8CC"));
                return [3 /*break*/, 6];
            case 4:
                err_1 = _b.sent();
                console.error('쿼리 실행 오류:', err_1);
                return [3 /*break*/, 6];
            case 5:
                client.release(); // 연결 종료
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/select', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query("\n      SELECT name\n      FROM user_test\n      WHERE name =$1\n    ", [name])];
            case 2:
                result = _a.sent();
                console.log(result.rows);
                if (result.rows.length > 0) {
                    res.json({ message: "존재함" });
                }
                else {
                    res.json({ message: "존재안함" });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('사용자 조회 실패:', error_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
