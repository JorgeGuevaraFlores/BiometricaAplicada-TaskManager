export interface Result<T> {
    correct: boolean;
    errorMessage: string | null;
    object: T | null;
    objects: T[] | null;
}