import { Profile } from '../profiles/profile.model';
import { Task } from '../tasks/task.model';

export interface IAlarm {
    profile: Profile;
    tasks: Task[];
} 