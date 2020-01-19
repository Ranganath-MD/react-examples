import DropeeDown from "./Exercises/DropeeDown/DropeeDown"
import Home from "./Home/Home"
import DataOnCheck from "./Exercises/DataOnCheck/DataOnCheck"
import Radiofy from "./Exercises/Radiofy/Radiofy"
import AddTodo from "./Exercises/AddTodo/AddTodo"
import EmojiList from "./Exercises/SearchEmoji/emojiList"
import Form from "./Exercises/Form/Form"
import SelectAll from "./Exercises/SelectAll/selectAll"
export const routes = [
    {
        path : "/",
        component : Home,
        exact : true
    },
    {
        path : "/dropee-down",
        component : DropeeDown,
        exact : true
    },
    {
        path : "/get-data-on-radio-check",
        component : Radiofy,
        exact : true
    },
    {
        path : "/add-todo",
        component : AddTodo,
        exact : true
    },
    {
        path : "/emoji-list",
        component : EmojiList,
        exact : true
    },
    {
        path : "/form-submission",
        component : Form,
        exact : true
    },
    {
        path : "/get-data-on-check",
        component : DataOnCheck,
        exact : true
    },
    {
        path : "/select-checkbox",
        component : SelectAll,
        exact : true
    },

]