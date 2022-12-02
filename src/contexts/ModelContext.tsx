import { createContext } from "react"
import Model from "../model";

const ModelContext = createContext(new Model())
export default ModelContext;