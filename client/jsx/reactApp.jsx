var SimpleList = React.createClass({
    getInitialState: function(){
        console.log('initial')
        return {
            simpleList: [
                {
                    'row':'cargando   ....'
                }
            ]
        }
    },
    componentDidMount: function(){
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            success: function(data){
                console.log("data",data.tasks)
                this.setState({simpleList:data.tasks})
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString())
            }.bind(this)
        })
    },
    render: function(){
        return (
            <span>
                <p><strong>Pasos para dominar un nuevo lenguage de programación</strong></p>
                <SimpleListRow simpleList={this.state.simpleList}/>
             </span>
        )
    }
})

var SimpleListRow = React.createClass({
    render: function(){
        console.log(this.props)
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
    handleSubmit:  function(e){
        e.preventDefault();
        var item = React.findDome(this.refs.task).value.trim()

        if(!item){
            return 
        }

        React.findDOMNode(this.ref.task).value=''
        return 
    }
    render: function(){
        return {
            <form onSubmit={this.handleSubmit}>
                <input type='text' refs='task'>
                <button type='submit'> Add Task </button>
            </form>
        }
    }
})

React.render(
    <SimpleList url='api/list'/>,
    document.getElementById('simpleList')
)

