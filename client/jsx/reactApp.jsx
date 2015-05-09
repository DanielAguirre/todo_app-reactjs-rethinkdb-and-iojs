var SimpleList = React.createClass({
    render: function(){
        return (
            <span>
                <p><strong>Pasos para dominar un nuevo lenguage de programación</strong></p>
                <SimpleListForm/>
                <SimpleListRow simpleList={this.state.simpleList}/>
             </span>
        )
    }
})

var SimpleListRow = React.createClass({
    render: function(){        
        var rows = this.props.simpleList;
        return (
            <ol>
                {rows.map(function(element) {
                    return (
                        <li>{element.row}</li>
                    );
                })}
            </ol>
        );
    }
})

var SimpleListForm = React.createClass({
    handleListSubmit:  function(e){
        e.preventDefault()
        var item = React.findDOMNode(this.refs.task).value.trim()

        if(!item){
            return 
        }
        this.props.onListSubmit({'row':item});
        React.findDOMNode(this.refs.task).value=''        
    },
    render: function(){
        return (
            <form onSubmit={this.handleListSubmit}>
                <input type='text' ref='task'/>
                <button type='submit'> Add Task </button>
            </form>
        )
    }
})

var SimpleListBox = React.createClass({
    handleListSubmit:  function(task){
        $.ajax({
            type:'POST',
            url: 'api/list',
            data: task,
            dataType: 'json',
            success: function(data) {
                this.setState({simpleList: task});
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        });
        return 
    },
    getInitialState: function(){
        return {
            simpleList: [
                {
                    'row':'cargando  ....'
                }
            ]
        }
    },
    componentDidMount: function() {
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({simpleList:data.tasks})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString())
            }.bind(this)
        })
    },
    render:function(){
        return (
            <span>
                <p><strong>Pasos para dominar un nuevo lenguage de programación</strong></p>
                <SimpleListForm onListSubmit={this.handleListSubmit}/>
                <SimpleListRow simpleList={this.state.simpleList}/>
             </span>
            )
    }
})

React.render(
    <SimpleListBox url='api/list'/>,    
    document.getElementById('simpleList')
)