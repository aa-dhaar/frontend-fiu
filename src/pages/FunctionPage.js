import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import functionService from '../services/functionService'

import TemplatePage from './TemplatePage'
import Function from '../components/Function'
import CreateNew from '../components/CreateNew'
import Loader from '../components/Loader'

const Functions = ({ functions }) => {
	return (
		<>
			{functions.map(el => (
				<Function
					functionName={el.functionName}
					functionId={el.functionId}
					jsonSchema={el.jsonSchema}
					state={el.state}
					created={el.created}
					lastUpdated={el.lastUpdated}
					key={el.functionId}
				/>
			))}
		</>
	)
}

export default function FunctionPage() {
	const [functions, setFunctions] = useState(null)
	const fiuId = useSelector(state => state.id)
	const hook = () => {
		const fetchData = async () => {
			const data = await functionService.getFunctionsByFiuId(fiuId)
			console.log(data)
			if (data !== undefined) {
				let items = []
				for (let key in data.functions) {
					let item = data.functions[key]
					items.push(item)
				}
				setFunctions(items)
			}
		}
		fetchData()
	}

	useEffect(hook, [])

	return (
		<TemplatePage>
			<div className="pkg-box">
				<h1>My Functions</h1>
				{functions ? <Functions functions={functions} /> : <Loader />}
				<CreateNew />
			</div>
		</TemplatePage>
	)
}
