import { FC, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import Project from "../../project";

interface AddProps {
  addHandler: (project: Project) => void;
}

const Add: FC<AddProps> = ({ addHandler }) => {
  const [showModal, setShowModal] = useState(false);

  const addProject = () => {
    const projectObj: Project = {
      id: "asdf",
      name: "aaa",
      rating: 5,
      created_at: new Date().toISOString(),
      url: "dsfasdf",
    };

    addHandler(projectObj);
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
        onCancel={() => setShowModal(false)}
      >
        <Form name="add" layout="vertical">
          <Form.Item required label="Project name" name="name">
            <Input />
          </Form.Item>
          <Form.Item required label="Project url (GitHub)" name="url">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
