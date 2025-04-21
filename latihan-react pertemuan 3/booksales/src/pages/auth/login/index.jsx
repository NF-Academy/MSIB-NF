import { Link } from "react-router";

export default function  Login (){
    return (
        <>
        <div className="modal modal-sheet position-static d-block p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
  <div className="modal-dialog">
    <div className="modal-content rounded-4 shadow">
      <div className="modal-header p-5 pb-4 border-bottom-0 d-flex justify-content-center">
        <h1 className="fw-bold mb-0 fs-2">Login</h1>
      </div>

      <div className="modal-body p-5 pt-0">
        <form className="">
          <div className="form-floating mb-3">
            <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
          <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
          <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
            <svg className="bi me-1" width="16" height="16" aria-hidden="true"><use xlink:href="#google"/></svg>
            Login with Google
          </button>
          <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
            <svg className="bi me-1" width="16" height="16" aria-hidden="true"><use xlink:href="#facebook"/></svg>
            Login with Facebook
          </button>
          <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
            <svg className="bi me-1" width="16" height="16" aria-hidden="true"><use xlink:href="#github"/></svg>
            Login with GitHub
          </button>
        </form>
        <p>
            Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  </div>
</div>
        </>
    )
}