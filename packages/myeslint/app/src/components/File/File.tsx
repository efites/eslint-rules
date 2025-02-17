import {IFileTree} from '../../api/tree'


export const File = (file: IFileTree) => {


	return <div>
		__file__
		{file.name}
	</div>
}