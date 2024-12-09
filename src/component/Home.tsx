import { Link } from 'react-router-dom'

function Home() {
	return (
		<>
			<div className='container'>
				<div className="form-container">
					<h1>Home</h1>
					<img src='logo.png' alt='logo'
						width={"100%"}
						height={"100%"} 
					/>
					<Link to="/"><button>Sign Out</button></Link>

				</div>
			</div>
		</>
	)
}

export default Home

