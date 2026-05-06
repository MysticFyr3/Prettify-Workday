console.log("INFO: Prettify Workday loaded successfully.");

// import registry FIRST
import { startObserver } from './core/registry.js';

// import enhancers (they self-register)
import './enhancers/table.js';
import './enhancers/tableCurrentCourses.js';

// start everything
startObserver();