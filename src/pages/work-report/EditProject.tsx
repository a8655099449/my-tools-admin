import HandleList from "@/components/HandleList/HandleList";
import { Button, Drawer, Input, List, Modal } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import React, { FC, ReactElement, useState } from "react";

interface IProps {
  projects: Option[];
  setProjects(p: Option[]): void;
}
const EditProject: FC<IProps> = ({ projects, setProjects }): ReactElement => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button  onClick={() => setVisible(true)}>
        项目管理
      </Button>
      <Drawer
        title={`项目管理`}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        width={800}
      >
        <List
          dataSource={projects}
          render={({ label, value, isEdit }, index) => {
            return (
              <List.Item
                key={index}
                extra={
                  <HandleList
                    onDelete={() => {
                      const _projects = [...projects];
                      _projects.splice(index, 1);
                      setProjects(_projects);
                    }}
                    onEdit={() => {
                      const _projects = [...projects];
                      _projects[index].isEdit = true;
                      setProjects(_projects);
                    }}
                  />
                }
              >
                {isEdit ? (
                  <Input
                    value={label}
                    onChange={(e) => {
                      const _projects = [...projects];
                      _projects[index].label = e;
                      _projects[index].value = e;
                      setProjects(_projects);
                    }}
                    onPressEnter={() => {
                      const _projects = [...projects];
                      _projects[index].isEdit = false;
                      setProjects(_projects);
                    }}
                  />
                ) : (
                  label
                )}
              </List.Item>
            );
          }}
        />
        <Button
          icon={<IconPlus />}
          long
          type="primary"
          style={{ marginTop: 10 }}
          onClick={(e) => {
            setProjects([
              ...projects,
              {
                label: "",
                value: "",
                isEdit: true,
              },
            ]);
          }}
        >
          添加
        </Button>
      </Drawer>
    </>
  );
};

export default EditProject;
