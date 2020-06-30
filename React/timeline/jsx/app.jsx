/*Tsui Lok In 1155094820 assg4 */
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activities: activities,
            filteredActivities: activities,
            showbar: false,
            listview: true,
        };
    }

    filteredActivities = searchText =>{
        return this.state.activities
            .filter(activity => {
                if(activity.content.toLowerCase().includes(searchText.toLowerCase())){return true;}
                return false;
            }
            );
    }

    handleSearchChange = event =>{
        this.setState({filteredActivities: this.filteredActivities(event.target.value)});
    };

    handlehideshow = event => {
        this.setState({filteredActivities: this.filteredActivities("")});
        if(this.state.showbar==false){this.setState({showbar: true});}
        else {this.setState({showbar: false});}
    };

    handledelete = event => {
        
    };
    addnew = event => {
        var content = prompt("Please enter your content");
        var time = prompt("Please enter the time");
        var a=[{img_url:"assets/dog.jpg",time:time,content:content,comment_count:"0",show:true}]
        var b = a.concat(this.state.filteredActivities)
        var c = a.concat(this.state.activities)
        this.setState({filteredActivities:b})
        this.setState({activities:c})
    };

    handlelview = event =>{
        if(this.state.listview==false){this.setState({listview: true});}
        else {this.setState({listview: false});}
    }

    render(){
        return(
            <div className="notificationsFrame">
                <div className="panel">
                    <Header onClick2={this.addnew} onClick1={this.handlehideshow} name={this.props.name} onClick3={this.handlelview} />
                    <SearchBar onChange={this.handleSearchChange} showbar={this.state.showbar} />
                    <Content activities={this.state.filteredActivities} listview={this.state.listview}/>
                </div>
            </div>
        )
    }
}

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="header">
                <MenuIcon onClick={this.props.onClick3}/>
                <Title name={this.props.name} onClick={this.props.onClick2}/>
                <SearchIcon onClick={this.props.onClick1}/>
            </div>
        );
    }
}

class SearchIcon extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className="fa fa-search searchIcon" onClick={this.props.onClick}></div>;
    }
}
    
class MenuIcon extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="menuIcon" onClick={this.props.onClick}>
                <div className="dashTop"></div>
                <div className="dashBottom"></div>
                <div className="circle"></div>
            </div>
        );
    }
}

class Title extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <span className="title" onClick={this.props.onClick}> {this.props.name}</span>;
    }
}

const activities=[
    {img_url:"assets/dog.jpg",time:"A hour ago",content:"Have lunch",comment_count:"2"},
    {img_url:"assets/dog.jpg",time:"5 hour ago",content:"Have breakfast",comment_count:"0"},
    {img_url:"assets/dog.jpg",time:"6 hour ago",content:"Get up",comment_count:"1"}
];

class Content extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.listview){
            return(
                <div className="content">
                    <div className="line"></div>
                    {this.props.activities.map(activity =>
                            <ActivityItem 
                            img_url={activity.img_url}
                            time={activity.time}
                            content={activity.content}
                            comment_count={activity.comment_count}
                            />
                    )}
                </div>
            )
        }
        else{
            return(
            <div className="gridcontent">
                {this.props.activities.map(activity =>
                    <ActivityItemGrid 
                    img_url={activity.img_url}
                    time={activity.time}
                    content={activity.content}
                    />
                )}
            </div>
            )
        }
    }
}
class ActivityItemGrid extends React.Component{
    render(){
        return(
            <div className= "itemgrid" >
                <div>
                    <img src={this.props.img_url} />
                </div>
                <p className="center">
                    {this.props.content}
                </p>
                <span className="center">
                    {this.props.time}
                </span>
            </div>
        )
    }
}

class ActivityItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true
        }
    }
    handledelete = event =>{
        var a =confirm("Delete?")
        if(a)this.setState({show:false})
        event.preventDefault();
    }
    render(){
        return(
            <div className= {this.state.show ? "item":"hidden"} onContextMenu={this.handledelete}>
                <div className="avatar">
                    <img src={this.props.img_url} />
                </div>
                <span className="time">
                    {this.props.time}
                </span>
                <p>
                {this.props.content}
                </p>
                <div className="commentCount">
                    {this.props.comment_count}
                </div>
            </div>
        )
    }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.showbar){return (
            <div className="search-bar" >
            <input type="text" onChange={this.props.onChange} />
            </div>
        ); }
        else {return (null)}
    }
}


ReactDOM.render(<App name="Timeline"/>,document.querySelector("#app"));