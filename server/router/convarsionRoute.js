import Express from "express";
import { createNew, getAllCon } from "../controller/convarsionController.js";


const convarsionRoute = Express.Router();

convarsionRoute.post("/get-all-con",getAllCon)
convarsionRoute.post("/createnew", createNew)

export default convarsionRoute;