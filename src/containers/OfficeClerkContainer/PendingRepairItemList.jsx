import React, { Component } from 'react'
import BrokenItemCard from '../../components/BrokenItemCard';
import { Link } from "react-router-dom";
import OfficeClerkService from "../../api/office_clerk_api";

class PendingRepairItemList extends Component {
    constructor(props) {
        super(props);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.clickItem = this.clickItem.bind(this);
        this.clickYes = this.clickYes.bind(this);
        this.clickNo = this.clickNo.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.markAsFinishedRepair = this.markAsFinishedRepair.bind(this);
        this.state = {
            itemList:[],
            isClick: false,
            selectID: "",
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
      }
    
  
    
      retrieveTutorials() {
    
        OfficeClerkService.getPendingDamages()
          .then(response => {
            this.setState({
              itemList: response.data
            });
            // console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      clickItem(id) {
        this.setState({
          isClick: true,
          selectID: id,
        });
      }
    
      clickYes() {
        this.markAsFinishedRepair(this.state.selectID);
        this.refreshList();
        this.setState({
          isClick: false,
        });
        window.location.reload();
      }
    
      clickNo() {
        this.setState({
          isClick: false,
        });
      }
    
      refreshList() {
        this.setState({
          itemList: [],
        });
        this.retrieveTutorials();
      }
    
    
    
      markAsFinishedRepair(id) {
        OfficeClerkService.markAsFinishedR(id)
          .then((response) => {
            // this.setState({
            //     itemList: response.data
            // });
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }

   

    render() {  
  
        if (this.state.isClick) {
            return (
              <div>
                <h3>Are you sure?</h3>
                <p>Do you want mark as send to repair?</p>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary m-1"
                    onClick={this.clickNo}
                  >
                    No
                  </button>
      
                  <button
                    type="button"
                    className="btn btn-warning m-1"
                    onClick={this.clickYes}
                  >
                    Yes
                  </button>
                </div>
              </div>
            );
          }
          if (this.state.itemList.length == 0) {
            return (
                 
                    <div style={this.newStyle}>
                        <h3 style={{textAlign:"center",}}>New Damage Item</h3>
                        <br />
                        <div>
                            <h4>No Item Under Repairing</h4>
                        </div>
                    </div>
                
            );
          }
          return (
            <div style={this.newStyle}>
              <h3 style={{ textAlign: "center" }}>New Damage Item</h3>
              <br />
              <div>
                {this.state.itemList.map((item) => {
                  // console.log("item");
                  // console.log(item.equipment.category);
                  return (
                    <div>
                      <a onClick={() => this.clickItem(item.id)}>
                        <BrokenItemCard
                          key={item.id}
                          model={item.equipment.modelName}
                          category={item.equipment.category}
                          storeCode={item.equipment.storeCode}
                          issue={item.reason}
                          labName={item.equipment.labName}
                          openDate={item.openDate}
                          image={item.equipment.imageURL}
                        />
                      </a>
      
                      <br />
                    </div>
                  );
                })}
        
              </div>
            </div>
          );
    }

    newStyle= {
        // margin: 40,
        padding: 30,
         background:" #bef1be",
          borderRadius: 20,
    };
}
 
export default PendingRepairItemList;
