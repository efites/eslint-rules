declare module '*.css' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames
	export = classNames
}

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}