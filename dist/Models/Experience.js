"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExperienceSchema = new mongoose_1.Schema({
    CompanyName: { type: String, required: true },
    Posting: { type: String, required: true },
    StartDate: { type: String, required: true },
    EndDate: { type: String, required: true },
    Summary: { type: String, required: true },
    TaskOrResponsnibility: [{ type: String, required: true }]
});
exports.default = (0, mongoose_1.model)("Experiences", ExperienceSchema);
