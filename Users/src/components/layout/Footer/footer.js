import React from 'react';
import { Layout } from 'antd';
import { Col, Row, Divider } from "antd";
import { SocialIcon } from 'react-social-icons';
import "./footer.css";

const { Footer } = Layout;

function _Footer() {
    return (

        <Footer style={{ backgroundColor: "#1e0a7c", padding: 30, paddingTop: 80 }}>
            <Row className="footer-desktop">
                
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Thông tin và chính sách</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Mua hàng và thanh toán Online</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Mua hàng trả góp Online</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Tra thông tin bảo hành</p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Dịch vụ và thông tin khác</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Ưu đãi thanh toán</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Quy chế hoạt động</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Chính sách Bảo hành</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Liên hệ hợp tác kinh doanh</p>
                </Col>
                <Col span={5} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Địa chỉ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Trụ sở :  Đống Đa , Hà Nội </p>

                </Col>
                <Col  span={4}>
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 40, cursor: "pointer" }}>Kết nối với chúng tôi</strong>
                    <Row style={{ marginTop: 15 }}>
                        <Col span={6}>
                            <SocialIcon url="https://www.youtube.com/@CellphoneSOfficial" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.facebook.com/CellphoneSVietnam" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.instagram.com/cellphonesvn/" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.tiktok.com/@cellphones.official" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                    </Row>

                </Col>
            </Row>
            <div className="footer-mobile">
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Home Page</strong>
                </Row>
                <Row justify="center">
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>About Us</p>
                </Row>
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer", textAlign: "center" }}>Our Connection</strong>
                </Row>
                <Row justify="center">
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Da Store</p></Row>
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 30, cursor: "pointer" }}>Follow Us</strong>
                </Row>

                <Row style={{ marginTop: 5 }} justify="center">
                    <Col >
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                </Row>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Divider style={{ padding: 0 }} />
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Copyright@ 2024 Created by team Mobile Store</p>
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Điện thoại: (+84) 378353196 - (+84) 976626280</p>
            </div>
        </Footer>
    );
}

export default _Footer;