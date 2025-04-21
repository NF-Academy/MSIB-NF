export default function Team() {
    return (
        <>
         <section className="py-5 bg-light text-center" id="team">
          <div className="container">
            <h2 className="mb-4">Our Team</h2>
            <div className="row">
              <div className="col-lg-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Raka Andika" className="rounded-circle mb-3" width="140" height="140" />
                <h5>Raka Andika</h5>
                <p className="text-muted">Frontend Developer</p>
              </div>
              <div className="col-lg-4">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Salsabila Putri" className="rounded-circle mb-3" width="140" height="140" />
                <h5>Salsabila Putri</h5>
                <p className="text-muted">UI/UX Designer</p>
              </div>
              <div className="col-lg-4">
                <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Ilham Prasetyo" className="rounded-circle mb-3" width="140" height="140" />
                <h5>Ilham Prasetyo</h5>
                <p className="text-muted">Backend Developer</p>
              </div>
            </div>
          </div>
        </section>
        </>
    )
}