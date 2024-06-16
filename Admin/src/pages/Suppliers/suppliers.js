import {
    BarsOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop,
    Breadcrumb,
    Button,
    Col,
    Empty,
    Form,
    Input,
    Modal, Popconfirm,
    Row,
    Space,
    Spin,
    Table,
    notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axiosClient from '../../apis/axiosClient';
import supplierApi from "../../apis/supplierApi";
import "./suppliers.css";
import uploadFileApi from '../../apis/uploadFileApi';

const Suppliers = () => {

    const [newsList, setNewsList] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [total, setTotalList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();

    const [file, setUploadFile] = useState();

    const history = useHistory();

    const showModal = () => {
        setOpenModalCreate(true);
    };


    const handleOkUser = async (values) => {
        setLoading(true);
        try {

            const categoryList = {
                "name": values.name,
                "description": description,
                "image": file,
            }
            return axiosClient.post("/supplier", categoryList).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo nhà cung cấp thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo nhà cung cấp thành công',
                    });
                    setOpenModalCreate(false);
                    handleCategoryList();
                }
            })
        } catch (error) {
            throw error;
        }
    }

    const handleUpdateCategory = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            const categoryList = {
                "name": values.name,
                "description": description,
                "image": file,
            }
            await axiosClient.put("/supplier/" + id, categoryList).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa nhà cung cấp thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa nhà cung cấp thành công',
                    });
                    handleCategoryList();
                    setOpenModalUpdate(false);
                }
            })
            setLoading(false);

        } catch (error) {
            throw error;
        }
    }

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
    };

    const handleCategoryList = async () => {
        try {
            await supplierApi.getListSuppliers({ page: 1, limit: 10 }).then((res) => {
                console.log(res);
                setNewsList(res);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await supplierApi.deleteSupplier(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa nhà cung cấp thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa nhà cung cấp thành công',

                    });
                    setCurrentPage(1);
                    handleCategoryList();
                    setLoading(false);
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleChange = (content) => {
        console.log(content);
        setDescription(content);
    }

    const handleEditCategory = (id) => {
        setOpenModalUpdate(true);
        (async () => {
            try {
                const response = await supplierApi.getDetailSupplier(id);
                setId(id);
                form2.setFieldsValue({
                    name: response.name,
                    description: setDescription(response.description),
                });
                console.log(form2);
                setLoading(false);
            } catch (error) {
                throw error;
            }
        })();
    }

    const handleFilter = async (name) => {
        try {
            const res = await supplierApi.searchSuppliers(name);
            setTotalList(res.totalDocs)
            setNewsList(res);
        } catch (error) {
            console.log('search to fetch news list:' + error);
        }
    }


    const handleChangeImage = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setUploadFile(response);
        }
        setLoading(false);
    }

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} style={{ width: '65%' }} />,
            width: '10%'
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <div className='box_detail_description' dangerouslySetInnerHTML={{ __html: text }}></div>,
            width: '20%'

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row>
                        <Button
                            size="small"
                            icon={<EditOutlined />}
                            style={{ width: 150, borderRadius: 15, height: 30 }}
                            onClick={() => handleEditCategory(record.id)}
                        >{"Chỉnh sửa"}
                        </Button>
                        <div
                            style={{ marginLeft: 10 }}>
                            <Popconfirm
                                title="Bạn có chắc chắn xóa nhà cung cấp này?"
                                onConfirm={() => handleDeleteCategory(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                >{"Xóa"}
                                </Button>
                            </Popconfirm>
                        </div>
                    </Row>
                </div >
            ),
        },
    ];


    useEffect(() => {
        (async () => {
            try {
                await supplierApi.getListSuppliers().then((res) => {
                    console.log(res);
                    setTotalList(res.totalDocs)
                    setNewsList(res);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <BarsOutlined />
                                <span>Nhà cung cấp</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        <Input
                                            placeholder="Tìm kiếm"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                            <Space>
                                                <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo nhà cung cấp</Button>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={newsList} />
                    </div>
                </div>

                <Modal
                    title="Tạo nhà cung cấp mới"
                    visible={openModalCreate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                handleOkUser(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={() => handleCancel("create")}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={800}
                >
                    <Spin spinning={loading}>
                        <Form
                            form={form}
                            name="eventCreate"
                            layout="vertical"
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your sender name!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >

                                <SunEditor
                                    lang="en"
                                    placeholder="Content"
                                    onChange={handleChange}
                                    setContents={description}
                                    setOptions={{
                                        buttonList: [
                                            ["undo", "redo"],
                                            ["font", "fontSize"],
                                            // ['paragraphStyle', 'blockquote'],
                                            [
                                                "bold",
                                                "underline",
                                                "italic",
                                                "strike",
                                                "subscript",
                                                "superscript"
                                            ],
                                            ["fontColor", "hiliteColor"],
                                            ["align", "list", "lineHeight"],
                                            ["outdent", "indent"],

                                            ["table", "horizontalRule", "link", "image", "video"],
                                            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                            // ['imageGallery'], // You must add the "imageGalleryUrl".
                                            // ["fullScreen", "showBlocks", "codeView"],
                                            ["preview", "print"],
                                            ["removeFormat"]

                                            // ['save', 'template'],
                                            // '/', Line break
                                        ],
                                        fontSize: [
                                            8, 10, 14, 18, 24,
                                        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                                        defaultTag: "div",
                                        minHeight: "300px",
                                        showPathLabel: false,
                                        attributesWhitelist: {
                                            all: "style",
                                            table: "cellpadding|width|cellspacing|height|style",
                                            tr: "valign|style",
                                            td: "styleinsert|height|style",
                                            img: "title|alt|src|style"
                                        }
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Chọn ảnh"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>

                        </Form>

                    </Spin>
                </Modal>


                <Modal
                    title="Chỉnh sửa nhà cung cấp"
                    visible={openModalUpdate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form2
                            .validateFields()
                            .then((values) => {
                                form2.resetFields();
                                handleUpdateCategory(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Spin spinning={loading}>
                        <Form
                            form={form2}
                            name="eventCreate"
                            layout="vertical"
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your sender name!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >

                                <SunEditor
                                    lang="en"
                                    placeholder="Content"
                                    onChange={handleChange}
                                    setContents={description}
                                    setOptions={{
                                        buttonList: [
                                            ["undo", "redo"],
                                            ["font", "fontSize"],
                                            // ['paragraphStyle', 'blockquote'],
                                            [
                                                "bold",
                                                "underline",
                                                "italic",
                                                "strike",
                                                "subscript",
                                                "superscript"
                                            ],
                                            ["fontColor", "hiliteColor"],
                                            ["align", "list", "lineHeight"],
                                            ["outdent", "indent"],

                                            ["table", "horizontalRule", "link", "image", "video"],
                                            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                            // ['imageGallery'], // You must add the "imageGalleryUrl".
                                            // ["fullScreen", "showBlocks", "codeView"],
                                            ["preview", "print"],
                                            ["removeFormat"]

                                            // ['save', 'template'],
                                            // '/', Line break
                                        ],
                                        fontSize: [
                                            8, 10, 14, 18, 24,
                                        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                                        defaultTag: "div",
                                        minHeight: "300px",
                                        showPathLabel: false,
                                        attributesWhitelist: {
                                            all: "style",
                                            table: "cellpadding|width|cellspacing|height|style",
                                            tr: "valign|style",
                                            td: "styleinsert|height|style",
                                            img: "title|alt|src|style"
                                        }
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Chọn ảnh"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>
                        </Form>

                    </Spin>
                </Modal>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default Suppliers;