class WorkerHeaderService{
    constructor() {
        if(WorkerHeaderService.instance == null){
            WorkerHeaderService.instance = this
        }
    }

    setTitle = (name)=>{
        const workerHeader = document.getElementsByClassName("worker-area-header")[0]
        let title = document.getElementsByClassName("worker-header-title")[0]
        if(title){
            title.innerHTML = name
        }else{
            title = document.createElement("p")
            title.className = "worker-header-title"
            title.innerHTML = name
            workerHeader.appendChild(title)
        }
    }
}

const workerService = new WorkerHeaderService()

Object.freeze(workerService)

export default workerService