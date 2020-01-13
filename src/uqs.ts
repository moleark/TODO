import { Tuid, Query, Map } from "tonva";


export interface UqTodo {
    WorkItem: Tuid;
    SearchWork: Query;
    SearchWorkItem: Query;
    SearchWorkGrade: Query;
    WorkRelation: Map;
}

export interface UqHr {
    SearchEmployee: Query;
}


export interface UQs {
    todo: UqTodo;
    hr: UqHr;
}
