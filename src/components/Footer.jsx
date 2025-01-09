import '../styles/Footer.css';

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-item">
                <h4 className="soft-grey-text">
                    &copy; {new Date(Date.now()).getFullYear()} -{' '}
                    <a href="http://greysky.io">greysky.io</a>
                </h4>
            </div>
            
            <div className="footer-item">
                <a href="https://github.com/tlwirtz">
                    <h4 className="center-text">
                        <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                    </h4>
                </a>
            </div>
        </div>
    );
}
