import {Avatar, Box} from '@mui/material'
import {Handle, Position} from '@xyflow/react'
import {DefaultExtensionType, FileIcon, defaultStyles} from 'react-file-icon'
import {INode} from '../../api/tree'


export const FileNode = ({data}: {data: INode['data']}) => {
	const extension: string = data.label.split('.').at(-1) ?? 'txt'

	return (
		<Box sx={{
			position: 'relative',
			background: 'linear-gradient(90deg, rgba(72,115,131,1) 0%, rgba(85,138,158,1) 100%)',
			color: '#ffffff',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '10px',
			border: '1px solid #1a192b',
			borderRadius: '3px',
			width: '150px',
			fontSize: '12px',
			textAlign: 'center',
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
				paddingRight: '5px',
				width: '22px',
				height: '22px',
			}}>
				<FileIcon extension={extension} {...defaultStyles[extension as DefaultExtensionType]} />
				{/* <InsertDriveFile fontSize='small' sx={{color: '#345451'}} /> */}
			</Box>
			{!!data.errors && (
				<Avatar sx={{
					position: 'absolute',
					right: 0,
					top: 0,
					transform: 'translate(50%, -50%)',
					bgcolor: '#c62828',
					width: '20px',
					height: '20px',
					fontSize: 11,
				}}>
					{data.errors}
				</Avatar>
			)}
			{!!data.warnings && (
				<Avatar sx={{
					position: 'absolute',
					right: '25px',
					top: 0,
					transform: 'translate(50%, -50%)',
					bgcolor: '#f57c00',
					width: '20px',
					height: '20px',
					fontSize: 11,
				}}>
					{data.warnings}
				</Avatar>
			)}
			<Handle
				type="target"
				position={Position.Left}
				id="a"
			/>
			{data.label}
		</Box>
	)
}