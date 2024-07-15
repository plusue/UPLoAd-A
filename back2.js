let scheduleIdCounter = 0; // 고유 ID 카운터
const schedules = [];

// 데이터 검증 함수
function isValidSchedule(schedule) {
    if (!schedule || typeof schedule !== 'object') return false;
    if (!schedule.date || isNaN(Date.parse(schedule.date))) return false;
    if (typeof schedule.event !== 'string' || schedule.event.trim() === '') return false;
    return true;
}

// 일정 추가
function addSchedule(schedule) {
    if (!isValidSchedule(schedule)) {
        console.log('유효하지 않은 일정 형식입니다.');
        return;
    }
    const scheduleDate = new Date(schedule.date);
    if (scheduleDate.getTime() < Date.now()) {
        console.log('과거의 일정은 추가할 수 없습니다.');
        return;
    }
    const scheduleWithId = { ...schedule, id: scheduleIdCounter++ };
    schedules.push(scheduleWithId);
    console.log('일정이 추가되었습니다:', scheduleWithId);
    scheduleReminder(scheduleWithId.id); // 리마인더 설정
}

// 일정 수정
function editSchedule(scheduleId, newSchedule) {
    const index = schedules.findIndex(s => s.id === scheduleId);
    if (!isValidSchedule(newSchedule) || index === -1) {
        console.log('유효하지 않은 일정입니다.');
        return;
    }
    const scheduleDate = new Date(newSchedule.date);
    if (scheduleDate.getTime() < Date.now()) {
        console.log('과거의 일정으로 수정할 수 없습니다.');
        return;
    }
    cancelReminder(scheduleId); // 기존 리마인더 취소
    schedules[index] = { ...newSchedule, id: scheduleId };
    console.log('일정이 수정되었습니다:', schedules[index]);
    scheduleReminder(scheduleId); // 새 리마인더 설정
}

// 일정 삭제
function deleteSchedule(scheduleId) {
    const index = schedules.findIndex(s => s.id === scheduleId);
    if (index === -1) {
        console.log('유효하지 않은 ID입니다.');
        return;
    }
    cancelReminder(scheduleId); // 기존 리마인더 취소
    const deletedSchedule = schedules.splice(index, 1);
    console.log('일정이 삭제되었습니다:', deletedSchedule[0] || '일정이 존재하지 않습니다.');
}

const reminderIDs = {}; // 리마인더 ID 저장 객체

// 리마인더 설정 기능
function scheduleReminder(scheduleId) {
    const schedule = schedules.find(s => s.id === scheduleId);
    const now = new Date();
    const scheduleDate = new Date(schedule.date);
    const delay = scheduleDate.getTime() - now.getTime();

    if (delay < 0) {
        console.log('일정 시간이 이미 지났습니다.');
        return;
    }

    if (reminderIDs[scheduleId]) {
        clearTimeout(reminderIDs[scheduleId]);
    }

    const reminderID = setTimeout(() => {
        console.log(`리마인더: ${schedule.event} 일정이 다가왔습니다!`);
    }, delay);
    reminderIDs[scheduleId] = reminderID;
}

// 리마인더 취소 기능
function cancelReminder(scheduleId) {
    const reminderID = reminderIDs[scheduleId];
    if (reminderID) {
        clearTimeout(reminderID);
        const schedule = schedules.find(s => s.id === scheduleId);
        if (schedule) {
            console.log(`리마인더가 취소되었습니다: ${schedule.event}`);
        }
        delete reminderIDs[scheduleId];
    } else {
        console.log('취소할 리마인더가 없습니다.');
    }
}

// 일정 목록 출력
console.log('현재 일정 목록:', schedules);
