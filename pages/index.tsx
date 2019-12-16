import * as React from "react";
import { NextPage } from "next";
import { Table, message, Button, Input, Modal, Icon } from "antd";
import "antd/dist/antd.min.css";

// Empty interface for props
interface Props {}

// Interface for api data
interface Data {
  id: string;
  name?: string;
  dob?: string;
  email?: string;
}

const IndexPage: NextPage<Props> = () => {
  const [data, updateData] = React.useState<Data[]>([]);
  const [isFetchingData, updateIsFetchingData] = React.useState(false);
  const [isProcessing, updateIsProcessing] = React.useState(false);
  const [showOptional, updateShowOptional] = React.useState(false);

  const [currentUser, updateCurrentUser] = React.useState<Data | null>(null);

  const updatedData = async () => {
    if (isFetchingData) return;

    try {
      updateIsFetchingData(true);
      let hideLoadingMessage = message.loading("Fetching users..", 0);
      const res = await fetch("/api/users/getUsers", {
        method: "post"
      });
      const resJson = await res.json();
      if (res.ok && resJson) {
        updateData(resJson);
      } else {
        message.error("User updation failed");
      }
      hideLoadingMessage();
      updateIsFetchingData(false);
    } catch (e) {
      message.error("Something went wrong while updating user.");
      updateIsFetchingData(false);
    }
  };

  React.useEffect(() => {
    updatedData();
  }, []);

  return (
    <>
      <div className="container">
        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id"
            },
            {
              title: "Name",
              dataIndex: "name"
            },
            {
              title: "Email",
              dataIndex: "email"
            },
            {
              title: "DoB",
              dataIndex: "dob"
            },
            {
              title: "Created",
              dataIndex: "createdAt"
            },
            {
              title: "Updated",
              dataIndex: "updatedAt"
            },
            {
              title: "Actions",
              dataIndex: "actions"
            }
          ]}
          dataSource={data.map((d: Data) => ({
            ...d,
            actions: (
              <div>
                <Button
                  shape="circle"
                  icon="edit"
                  onClick={() => {
                    const modal = Modal.confirm({
                      icon: <Icon type="message" />,
                      title: "Enter user details",
                      onCancel: () => {
                        modal.destroy();
                      },
                      onOk: () => {
                        modal.destroy();
                      },
                      content: (
                        <div>
                          <form
                            id="edit-user-form"
                            onSubmit={e => {
                              e.preventDefault();
                              updateIsProcessing(true);
                              fetch("/api/users/updateUsers", {
                                method: "post",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  id: d.id,
                                  name: e.target[0].value,
                                  email: e.target[1].value,
                                  dob: e.target[2].value
                                })
                              }).then(res => {
                                updateIsProcessing(false);
                                if (res.ok) {
                                  message.success("Edited user");
                                  updatedData();
                                } else
                                  message.error(
                                    "Something went wrong while editing user"
                                  );
                                modal.destroy();
                              });
                            }}
                            style={{ marginTop: 30 }}
                          >
                            <Input
                              placeholder="Name"
                              required
                              defaultValue={d.name}
                            />
                            <Input
                              placeholder="Email"
                              type="email"
                              defaultValue={d.email}
                            />
                            <Input
                              placeholder="DoB"
                              type="date"
                              defaultValue={d.dob}
                            />
                            <div
                              style={{
                                textAlign: "center",
                                margin: "20px auto"
                              }}
                            >
                              <Button htmlType="submit" loading={isProcessing}>
                                Edit user
                              </Button>
                            </div>
                          </form>
                          <div
                            style={{ textAlign: "center", margin: "20px auto" }}
                          >
                            <Button
                              onClick={() => {
                                modal.destroy();
                              }}
                              loading={isProcessing}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )
                    });
                  }}
                />
                <Button
                  shape="circle"
                  icon="delete"
                  onClick={() => {
                    fetch("/api/users/deleteUser", {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...d })
                    }).then(res => {
                      if (res.ok) {
                        message.success("Deleted data");
                        updatedData();
                      } else
                        message.error(
                          "Something went wrong while deleting data"
                        );
                    });
                  }}
                />
              </div>
            )
          }))}
          pagination={{ pageSize: 10 }}
          size="small"
          rowKey={r => r.id}
        />
        <form
          id="add-user-form"
          onSubmit={e => {
            e.preventDefault();
            updateIsProcessing(true);
            fetch("/api/users/createUser", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: e.target[0].value,
                email: showOptional ? e.target[1].value : "",
                dob: showOptional ? e.target[2].value : ""
              })
            }).then(res => {
              updateIsProcessing(false);
              if (res.ok) {
                message.success("Added user");
                updatedData();
              } else message.error("Something went wrong while adding user");
            });
          }}
          style={{ marginTop: 30 }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input placeholder="Name" required />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => updateShowOptional(!showOptional)}
            >
              +Optional
            </div>
          </div>
          {showOptional && (
            <div style={{ marginTop: 10, display: "flex" }}>
              <Input placeholder="Email" type="email" />
              <Input placeholder="DoB" type="date" />
            </div>
          )}
          <div style={{ textAlign: "center", margin: "20px auto" }}>
            <Button htmlType="submit" loading={isProcessing}>
              Add User
            </Button>
          </div>
        </form>
        <Button
          onClick={() => {
            const pickUser = () =>
              data[Math.floor(Math.random() * data.length)];
            let pickOne = pickUser();
            while (pickOne === currentUser) {
              // Don't keep picking if only one user
              if (data.length === 1) break;
              pickOne = pickUser();
            }
            updateCurrentUser(pickOne);
          }}
        >
          Pick a random user
        </Button>
        {currentUser && (
          <div>
            <li>{currentUser.id}</li>
            <li>{currentUser.name}</li>
            <li>{currentUser.email}</li>
            <li>{currentUser.dob}</li>
          </div>
        )}
      </div>
      <style jsx global>{`
        .container {
          background-color: rgb(255, 255, 255);
          min-height: 100vh;
          border-radius: 15px;
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 30px;
        }
        .ant-modal-confirm-btns {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default IndexPage;
