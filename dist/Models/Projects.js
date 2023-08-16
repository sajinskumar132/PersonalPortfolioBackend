"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectsSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    TechStack: [{ type: String, require: true }],
    Summary: { type: String, require: true },
    Description: [{ type: String, require: true }],
    Url: { type: String, require: true }
});
exports.default = (0, mongoose_1.model)('Projects', ProjectsSchema);
