function Team() {
  return (
    <div className="text-center">
      <h1>Meet Our Team</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <img src="https://i.pravatar.cc/150?img=1" className="rounded-circle" alt="Team 1" />
          <h5>April</h5>
          <p>Front-End Developer</p>
        </div>
        <div className="col-md-4">
          <img src="https://i.pravatar.cc/150?img=2" className="rounded-circle" alt="Team 2" />
          <h5>Budi</h5>
          <p>UI/UX Designer</p>
        </div>
        <div className="col-md-4">
          <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle" alt="Team 3" />
          <h5>Cici</h5>
          <p>Back-End Developer</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
