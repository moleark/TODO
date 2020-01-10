import { Tuid, Query } from "tonva";


export interface UqTodo {
    WorkItem: Tuid;
    SearchWork: Query;
    SearchWorkItem: Query;
    SearchWorkGrade: Query;
}

export interface UQs {
    todo: UqTodo;
}
