import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom";

import { Col, Row } from 'react-bootstrap'
import OaCard from "../../components/common/OaCard"
import OaButton from "../../components/common/OaButton";

function Dashboard() {
  const { user, logout } = useAuth();
  const isAdmin = user.isAdmin;

  // Conditional to see if User is Logged in
  if(!user){
    <OaCard title="Dashboard" dashboardForm>
      <div className="text-center mb-4">
        Cannot Retrieve User
      </div>
    </OaCard>
  }

  // ADMIN CONDITIONAL
  // This checks to see if User is an Admin, if they are then show the Admin Panel
  // Otherwise show the User Panel
  if(isAdmin === true ){
    return(
      <div>
        <OaCard title="Dashboard" dashboardForm>
            <h4>Welcome {user.username}</h4>
          <Row className="mt-5">
            <Col>
              <div className="text-center mb-4">
                <h3>PROFILE</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <OaButton onClick={logout}>Logout</OaButton>
              </div>
            </Col>
            <Col>
              
              <h3>ADMIN PANEL</h3>
              <div className="d-grid gap-2">
                <Link to='/store/product/add'><OaButton>CREATE PRODUCT</OaButton></Link>
                <Link><OaButton>EDIT PRODUCT</OaButton></Link>
                <Link to='/dashboard/delete'><OaButton>DELETE PRODUCT</OaButton></Link>
              </div>
            </Col>
          </Row>
        </OaCard>
      </div>
    );
  } else {
    // IF USER IS NOT AN ADMIN, RETURN THIS
    return (
      <div>
        <OaCard title="Dashboard" dashboardForm>
            <h4>Welcome {user.username}</h4>
          <Row className="mt-5">
            <Col>
              <div className="text-center mb-4">
                <h3>PROFILE</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <OaButton onClick={logout}>Logout</OaButton>
              </div>
            </Col>
            <Col>
              
              <h3>USER PANEL</h3>
              <div className="d-grid gap-2">
                <OaButton>ORDER HISTORY</OaButton>
                <OaButton>PAYMENT DETAILS</OaButton>
              </div>
            </Col>
          </Row>
        </OaCard>
      </div>
    )

  }
}

export default Dashboard