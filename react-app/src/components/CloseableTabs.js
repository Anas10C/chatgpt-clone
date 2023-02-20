import React, { useState, useEffect } from 'react';
import './CloseableTabs.css'
import Chat from './Chat'
import client from '../Api'
import { useNavigate } from "react-router-dom";

function CloseableTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [readyForRender, setReadyForRender] = useState(false);

  useEffect(() => {
    client.get().then((response) => {
      let topics = response.data.map( ({name, _id}) => ({name, _id}) )
      setTabs(topics);
      setReadyForRender(true)
    });
  }, []);

  function handleTabClick(index) {
    setActiveTab(index);
  }

  function handleCloseTabClick(e, index) {
    e.stopPropagation();
    client.delete(tabs[index]._id)
    setTabs(tabs.filter((_, i) => i !== index));
    setActiveTab(Math.min(index, tabs.length - 2));
  }
  const navigate = useNavigate();
  function handleAddTopicClick(e) {
    e.stopPropagation();
    navigate("/");
  }

  if(readyForRender) {
    return (
      <div className="closeable-tabs">
        <ul className="tabs">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
              <button className="close-tab" onClick={(e) => handleCloseTabClick(e, index)}>
                x
              </button>
            </li>
          ))}
          <li>
          <button className="add-topic" onClick={(e) => handleAddTopicClick(e)}>
            +
          </button>
          </li>
        </ul>
        <div className="tab-content">
          <Chat id={tabs[activeTab]._id}/>
        </div>
      </div>
    );
  }
}

export default CloseableTabs;
