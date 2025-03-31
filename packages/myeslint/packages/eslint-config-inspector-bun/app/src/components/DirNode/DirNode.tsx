import {Folder} from '@mui/icons-material'
import {Box} from '@mui/material'
import {Handle, Position} from '@xyflow/react'
import {INode} from '../../api/tree'


export const DirNode = ({data}: {data: INode['data']}) => {


	return (
		<Box sx={{
			'background': 'linear-gradient(90deg, rgba(227,196,118,1) 0%, rgba(252,217,130,1) 100%)',
			'color': 'rgb(0, 0, 0)',
			'display': 'flex',
			'alignItems': 'center',
			'justifyContent': 'center',
			'padding': '10px',
			'border': '1px solid #1a192b',
			'borderRadius': '3px',
			'width': '150px',
			'fontSize': '12px',
			'textAlign': 'center',
		}}>
			<Box sx={{
				position: 'absolute',
				right: '100%',
				top: '50%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				transform: 'translateY(-50%)',
				paddingRight: '5px'
			}}>
				<Folder fontSize='small' sx={{color: '#fcd982'}} />
			</Box>
			<Handle
				type="source"
				position={Position.Right}
				id="a"
			/>
			<Handle
				type="target"
				position={Position.Left}
				id="b"
			/>
			{data.label}
		</Box>
	)
}