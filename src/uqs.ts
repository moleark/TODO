import { Tuid, Query, Map, Book, Action } from "tonva";


export interface UqTodo {
    WorkItem: Tuid;
    SearchWork: Query;
    SearchWorkItem: Query;
    SearchWorkGrade: Query;
    SearchEmployee: Query;
    WorkRelation: Map;
    WorkResponsible:Book;
    AddWorkResponsible:Action;
    SearchWorkDetail:Query;
}

export interface UqHr {
    SearchEmployee: Query;
}


export interface UQs {
    todo: UqTodo;
    hr: UqHr;
}
