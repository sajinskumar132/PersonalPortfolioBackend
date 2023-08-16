"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PersonalInfoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    Position: { type: String, required: true },
    Description: { type: String, required: true },
    Resume: { type: String, required: true },
    linkedinId: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('PersonalInfo', PersonalInfoSchema);
