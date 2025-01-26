
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { connectWallet } from './ConnectWallet';
import {ethers} from 'ethers';
import {useNavigate} from 'react-router-dom'
import VideoData from "./VideoData";
export default function Header() {

    const [account, setAccount] = useState(null);
    const [accountForData,setAccountForData] = useState(null);
    const handleConnectWallet = async () => {
      const signer = await connectWallet();
      const account = await signer.getAddress();
      if (account) {
        setAccount((account).toString());
        setAccountForData((account).toString());
        console.log((account));
      }
    };
    const navigate = useNavigate();
    const goToUpload =() =>{
        navigate('/upload');
        window.location.reload()
    }
    const goToHome =() =>{
        navigate('/home');
        window.location.reload()
    }
    const goToCustomVideos=() =>{
      navigate('/customvideos');
      window.location.reload()
    }
    const goToData = () => {
      handleConnectWallet();
      navigate('/data');
      window.location.reload();
    }
    const goToReports = () =>{
      navigate('/reports');
      window.location.reload();
    }
    




  return (
    <>
    
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <button type="button" className="btn btn-outline-info" onClick={goToHome}>HOME</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <button type="button" className="btn btn-outline-info" onClick={goToUpload}>UPLOAD</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <button type="button" className="btn btn-outline-info" onClick={goToCustomVideos}>My Videos</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <button type="button" className="btn btn-outline-info" onClick={goToReports}>Reported Videos</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {account === '0x9E3D8652190E44Be646EF40932a7FAf38B66f5af' && (
  <button type="button" className="btn btn-outline-info" onClick={goToData}>
    DATA
  </button>
)}



          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>


              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <li>
            <button type="button" className="btn btn-outline-info" onClick={handleConnectWallet}>
              {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
                </li>
          </div>
        </div>
      </nav>
    </>
  );
}
