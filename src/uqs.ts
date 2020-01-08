import { Tuid, Query } from "tonva";


export interface UqTodo {
    WorkItem: Tuid;
    SearchWorkItem: Query;
}

export interface UQs {
    todo: UqTodo;
}
