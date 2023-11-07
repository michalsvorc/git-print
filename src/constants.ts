const STATUS_DELETED = "(\\sD|D\\s)";
const STATUS_STAGED = "(\\s\\S)";
const STATUS_UNSTAGED = "(\\S\\s)";
const STATUS_UNTRACKED = "(\\?\\?)";

const regExpStatusDictionary = new Map();

regExpStatusDictionary.set("deleted", STATUS_DELETED);
regExpStatusDictionary.set("staged", `${STATUS_STAGED}|${STATUS_UNTRACKED}`);
regExpStatusDictionary.set("unstaged", STATUS_UNSTAGED);
regExpStatusDictionary.set("untracked", STATUS_UNTRACKED);

export { regExpStatusDictionary };
