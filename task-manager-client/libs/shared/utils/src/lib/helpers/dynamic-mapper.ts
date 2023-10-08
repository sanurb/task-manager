type TransformerFunction<T, U> = (input: T) => U;

/**
 * Mapea dinámicamente un objeto del tipo `T` a un objeto del tipo `U` aplicando transformaciones opcionales.
 * Si se proporciona una transformación para un campo específico, se aplica; de lo contrario, se copia el valor original.
 *
 * @template T - Tipo de origen del objeto que se va a mapear.
 * @template U - Tipo de destino al que se mapeará el objeto.
 *
 * @param {T} source - El objeto fuente que se va a mapear.
 * @param {Partial<Record<keyof T, TransformerFunction<any, any>>>} transformations - Un objeto que especifica las transformaciones opcionales a aplicar en campos específicos.
 *
 * @returns {U} - Retorna un objeto mapeado del tipo `U`.
 *
 * @example
 * ```ts
 * interface SourceType {
 *   id: string;
 *   date: string;
 * }
 *
 * interface DestType {
 *   id: number;
 *   date: Date;
 * }
 *
 * const source: SourceType = {
 *   id: "1",
 *   date: "2023-10-08"
 * };
 *
 * const transformed = dynamicTypeMapper<SourceType, DestType>(source, {
 *   id: (value) => Number(value),
 *   date: (value) => new Date(value)
 * });
 *
 * console.log(transformed); // { id: 1, date: Date('2023-10-08') }
 * ```
 */
export function dynamicTypeMapper<T extends Record<string, any>, U>(
    source: T,
    transformations: Partial<Record<keyof T, TransformerFunction<any, any>>>): U {

    const keys = Object.keys(source) as (keyof T)[];

    return keys.reduce((acc: Partial<U>, key) => {
        const transformationFunc = transformations[key];
        acc[key as keyof U] = transformationFunc
            ? transformationFunc(source[key])
            : source[key];
        return acc;
    }, {} as Partial<U>) as U;
}
