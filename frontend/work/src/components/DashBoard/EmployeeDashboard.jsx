

// EmployeeDashboard component displays the dashboard for employees.
// Employees can view, filter, and update their assigned tasks, submit work, and comment on tasks.
// This component fetches tasks, allows status updates, work submission, and commenting.
import { clientLogger, LogTags } from '../../utils/logger';


const EmployeeDashboard = () => {
  // State for all tasks assigned to the employee
  const [tasks, setTasks] = useState([]);
  // State for filtering tasks by status
  const [statusFilter, setStatusFilter] = useState('all');
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for comment input per task
  const [commentText, setCommentText] = useState({});
  // Loading state for async actions
  const [loading, setLoading] = useState(false);

  // Fetch tasks assigned to the employee from the backend on mount
  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'EmployeeDashboard loaded');
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // Get all tasks assigned to the employee
        const response = await api.get('/tasks/employee');
        setTasks(response.data);
        clientLogger.info(LogTags.TASK_FETCH, 'Employee fetched tasks');
      } catch (error) {
        clientLogger.error(LogTags.TASK_FETCH, 'Error fetching tasks', error);
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Update the status of a task (e.g., start progress, mark complete)
  const updateStatus = async (taskID, status) => {
    clientLogger.info(LogTags.TASK_STATUS, `Employee updating status for task ${taskID} to ${status}`);
    try {
      await api.put(`/tasks/${taskID}`, { status });
      // Update the status in local state
      setTasks(tasks.map(t => t._id === taskID ? { ...t, status } : t));
      toast.success('Task status updated!');
      clientLogger.info(LogTags.TASK_STATUS, `Task ${taskID} status updated to ${status}`);
    } catch (error) {
      clientLogger.error(LogTags.TASK_STATUS, `Error updating status for task ${taskID}`, error);
      toast.error('Failed to update status');
    }
  };

  // Handle submission of completed work for a task
  const handleSubmitWork = async (e, taskId) => {
    e.preventDefault();
    clientLogger.info(LogTags.TASK_UPDATE, `Employee submitting work for task ${taskId}`);
    try {
      // Prepare form data for file upload and note
      const formData = new FormData(e.target);
      await api.post(`/tasks/${taskId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Work submitted successfully!');
      e.target.reset();
      // Refresh tasks after submission
      const response = await api.get('/tasks/employee');
      setTasks(response.data);
      clientLogger.info(LogTags.TASK_UPDATE, `Work submitted for task ${taskId}`);
    } catch (error) {
      clientLogger.error(LogTags.TASK_UPDATE, `Error submitting work for task ${taskId}`, error);
      toast.error('Failed to submit work');
    }
  };

  // Handle submission of a comment for a task
  const handleCommentSubmit = async (taskId) => {
    const text = commentText[taskId]?.trim();
    if (!text) {
      toast.warning('Comment cannot be empty');
      return;
    }
    clientLogger.info(LogTags.COMMENT_ADD, `Employee adding comment to task ${taskId}`);
    try {
      await api.post(`/comments/${taskId}`, { text });
      setCommentText(prev => ({ ...prev, [taskId]: '' }));
      // Refresh tasks to show new comment
      const response = await api.get('/tasks/employee');
      setTasks(response.data);
      toast.success('Comment added!');
      clientLogger.info(LogTags.COMMENT_ADD, `Comment added to task ${taskId}`);
    } catch (error) {
      clientLogger.error(LogTags.COMMENT_ADD, `Error adding comment to task ${taskId}`, error);
      toast.error('Failed to add comment');
    }
  };

  // Filter and search tasks based on status and search query
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' ? true : task.status === statusFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics for dashboard cards
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'open' || t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>👨‍💼 Employee Dashboard</h1>
        <p className='text-gray-600'>View and manage your assigned tasks</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-4 gap-4 mb-8'>
        {/* Total assigned tasks */}
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>Total Assigned</p>
          <p className='text-3xl font-bold text-blue-600'>{stats.total}</p>
        </div>
        {/* Pending tasks */}
        <div className='bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>Pending</p>
          <p className='text-3xl font-bold text-red-600'>{stats.pending}</p>
        </div>
        {/* In progress tasks */}
        <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>In Progress</p>
          <p className='text-3xl font-bold text-yellow-600'>{stats.inProgress}</p>
        </div>
        {/* Completed tasks */}
        <div className='bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>Completed</p>
          <p className='text-3xl font-bold text-green-600'>{stats.completed}</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Filter by Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='all'>All Tasks ({stats.total})</option>
              <option value='pending'>Pending ({stats.pending})</option>
              <option value='in progress'>In Progress ({stats.inProgress})</option>
              <option value='completed'>Completed ({stats.completed})</option>
            </select>
          </div>
          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Search Tasks</label>
            <input 
              type='text'
              placeholder='Search by title or description...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      {/* Tasks Display */}
      {loading ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
          <p className='text-gray-500 text-lg'>📭 No tasks assigned to you yet</p>
          <p className='text-gray-400 mt-2'>{searchQuery ? 'Try adjusting your search' : 'Check back soon for new assignments!'}</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredTasks.map((task) => (
            <div key={task._id} className='bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-6'>
              {/* Task Header */}
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800'>{task.title}</h2>
                  <p className='text-gray-600 mt-2'>{task.description}</p>
                </div>
                {/* Task status badge */}
                <span className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ml-4 ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{task.status.toUpperCase()}</span>
              </div>

              {/* Task Info Grid */}
              <div className='grid grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg'>
                <div>
                  <p className='text-gray-500 text-xs font-semibold uppercase'>Created By</p>
                  <p className='text-gray-800 font-semibold'>{task.createdBy?.name || 'Manager'}</p>
                </div>
                <div>
                  <p className='text-gray-500 text-xs font-semibold uppercase'>Priority</p>
                  <p className='text-gray-800 font-semibold'>High</p>
                </div>
                <div>
                  <p className='text-gray-500 text-xs font-semibold uppercase'>Status</p>
                  <p className='text-gray-800 font-semibold capitalize'>{task.status}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-2 mb-6'>
                <button
                  onClick={() => updateStatus(task._id, 'in progress')}
                  disabled={task.status === 'completed'}
                  className='flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2'
                >
                  📊 Start Progress
                </button>
                <button
                  onClick={() => updateStatus(task._id, 'completed')}
                  disabled={task.status === 'completed'}
                  className='flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2'
                >
                  ✓ Mark Complete
                </button>
              </div>

              {/* Comments Section */}
              <div className='border-t pt-4 mb-4'>
                <h3 className='font-bold text-gray-800 mb-3'>💬 Comments</h3>
                <div className='space-y-2 max-h-40 overflow-y-auto mb-3 bg-gray-50 p-3 rounded'>
                  {/* List of comments for this task */}
                  {task.comments?.length > 0 ? (
                    task.comments.map((c, i) => (
                      <div key={i} className='text-sm bg-white p-3 rounded border-l-4 border-blue-500'>
                        <div className='flex justify-between items-start'>
                          <p className='font-semibold text-gray-800'>{c.createdBy?.name || 'Anonymous'}</p>
                          <span className='text-xs text-gray-500'>{new Date(c.createdAt).toLocaleString()}</span>
                        </div>
                        <p className='text-gray-700 mt-1'>{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500 text-sm text-center py-2'>No comments yet</p>
                  )}
                </div>
                {/* Add a new comment */}
                <div className='flex gap-2'>
                  <input
                    type='text'
                    placeholder='Add a comment...'
                    className='flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                    value={commentText[task._id] || ''}
                    onChange={(e) => setCommentText({ ...commentText, [task._id]: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(task._id)}
                  />
                  <button
                    onClick={() => handleCommentSubmit(task._id)}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold'
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Submit Work Section */}
              <form
                onSubmit={(e) => handleSubmitWork(e, task._id)}
                encType='multipart/form-data'
                className='border-t pt-4'
              >
                <h3 className='font-bold text-gray-800 mb-3'>📤 Submit Work</h3>
                <textarea
                  placeholder='Describe your completed work...'
                  name='note'
                  className='border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 resize-none h-20'
                />
                <div className='mb-3'>
                  <input 
                    type='file' 
                    name='file' 
                    className='block text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                  />
                </div>
                <button 
                  type='submit'
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition'
                >
                  📤 Submit Work
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
