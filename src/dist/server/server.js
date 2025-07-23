"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_routes_1 = __importDefault(require("../modules/modules.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = { PORT: Number(process.env.PORT || 8081) };
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.static('public'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/api', modules_routes_1.default);
    }
    listen() {
        this.app.listen(this.port.PORT, () => {
            console.log(`Server is running on port${this.port.PORT}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map