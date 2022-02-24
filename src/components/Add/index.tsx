import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Form, Input, Rate } from "antd";
import { PlusCircleTwoTone, StarFilled } from "@ant-design/icons";
import Project from "../../project";

interface AddProps {
  addHandler: (project: Project) => void;
}

const Add: FC<AddProps> = ({ addHandler }) => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const isActualUrl = async (urlVal: string): Promise<boolean> => {
    let fetchResponse = false;

    try {
      // base url for github API
      const baseUrl = "https://api.github.com/repos";
      const urlSplit = urlVal.split(".com/");
      await fetch(`${baseUrl}/${urlSplit[1]}`).then((response) => {
        fetchResponse = response.ok;
      });
    } catch (error) {
      console.error(error);
      fetchResponse = false;
    } finally {
      return fetchResponse;
    }
  };

  const addProject = () => {
    form
      .validateFields()
      .then((values) => {
        const projectObj: Project = {
          id: uuidv4(),
          created_at: new Date().toISOString(),
          ...values,
        };

        addHandler(projectObj);
        form.resetFields();
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleTwoTone />}
        onClick={() => setShowModal(true)}
      >
        Add new project
      </Button>
      <Modal
        title="Add new project"
        visible={showModal}
        okText="Add"
        onOk={addProject}
        onCancel={closeModal}
      >
        <Form form={form} name="add" layout="vertical" validateTrigger="onBlur">
          <Form.Item
            rules={[{ required: true, message: "Please input project name!" }]}
            label="Project name"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            validateFirst
            rules={[
              {
                required: true,
                message: "Please input project repository URL!",
              },
              () => ({
                async validator(_, value) {
                  if (await isActualUrl(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error("Input an actual GitHub repository URL!")
                    );
                  }
                },
              }),
            ]}
            label="Project repository URL (GitHub)"
            name="url"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Please input project rating!" },
            ]}
            label="Project rating"
            name="rating"
          >
            <Rate
              allowClear={false}
              character={
                <StarFilled style={{ stroke: "#000", strokeWidth: 50 }} />
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
