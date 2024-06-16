import {
    ContactsTwoTone,
    DashboardOutlined,
    EnvironmentTwoTone,
    HomeOutlined,
    NotificationTwoTone
} from '@ant-design/icons';
import {
    BackTop,
    Breadcrumb,
    Card,
    Col,
    Row,
    Spin
} from 'antd';
import React, { useEffect, useState } from 'react';
import newsApi from '../../apis/newsApi';
import userApi from '../../apis/userApi';
import "./dashBoard.css";
import productApi from '../../apis/productsApi';
import supplierApi from '../../apis/supplierApi';


const DashBoard = () => {
    const [statisticList, setStatisticList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotalList] = useState();
    const [product, SetProduct] = useState(null);
    const [supplier, SetSupplier] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                
                await newsApi.getListNews().then((res) => {
                    console.log(res);
                    setTotalList(res)
                    setLoading(false);
                });

                await productApi.getAllProducts().then((res) => {
                    console.log(res);
                    SetProduct(res)
                    setLoading(false);
                });

                await supplierApi.getListSuppliers().then((res) => {
                    console.log(res);
                    SetSupplier(res)
                    setLoading(false);
                });

                await userApi.listUserByAdmin().then((res) => {
                    console.log(res);
                    setStatisticList(res.data);
                    setLoading(false);
                });

            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={false}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <DashboardOutlined />
                                <span>DashBoard</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{statisticList?.length}</div>
                                        <div className='title_total'>Số thành viên</div>
                                    </div>
                                    <div>
                                        <ContactsTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{total?.length}</div>
                                        <div className='title_total'>Tổng bài đăng</div>
                                    </div>
                                    <div>
                                        <NotificationTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{product?.data?.length || 0} </div>
                                        <div className='title_total'>Tổng sản phẩm</div>
                                    </div>
                                    <div>
                                        <EnvironmentTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{supplier?.length || 0} </div>
                                        <div className='title_total'>Tổng số nhà cung cấp</div>
                                    </div>
                                    <div>
                                        <EnvironmentTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default DashBoard;