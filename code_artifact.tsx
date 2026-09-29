import React, { useState, useEffect, useMemo } from 'react';

// 초기 샘플 원생 데이터
const DEFAULT_STUDENTS = [
  { id: 1, name: '김민준', group: '초등 A반', parentPhone: '010-1234-5678', notes: '태권도 학원 연계' },
  { id: 2, name: '이서연', group: '초등 A반', parentPhone: '010-2345-6789', notes: '월/수/금 수업' },
  { id: 3, name: '박도윤', group: '초등 B반', parentPhone: '010-3456-7890', notes: '셔틀버스 2호차' },
  { id: 4, name: '최지우', group: '초등 B반', parentPhone: '010-4567-8901', notes: '' },
  { id: 5, name: '정예준', group: '중등 A반', parentPhone: '010-5678-9012', notes: '자율학습 참여' },
  { id: 6, name: '강하은', group: '중등 A반', parentPhone: '010-6789-0123', notes: '수학 보강 필요' },
  { id: 7, name: '윤시우', group: '유치부', parentPhone: '010-7890-1234', notes: '보호자 직접 하원' },
  { id: 8, name: '한아린', group: '유치부', parentPhone: '010-8901-2345', notes: '알레르기 유의' },
];

const Icons = {
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  XCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  UserPlus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  MessageSquare: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};

const STATUS_CONFIG = {
  present: {
    label: '출석',
    badgeClass: 'bg-emerald-600 text-white border-emerald-700',
    cardBorder: 'border-emerald-300 ring-2 ring-emerald-400/30',
    lightBg: 'bg-emerald-50/70',
    timeBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icon: Icons.CheckCircle,
  },
  late: {
    label: '지각',
    badgeClass: 'bg-amber-500 text-white border-amber-600',
    cardBorder: 'border-amber-300 ring-2 ring-amber-400/30',
    lightBg: 'bg-amber-50/70',
    timeBadge: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: Icons.Clock,
  },
  early: {
    label: '조퇴',
    badgeClass: 'bg-blue-500 text-white border-blue-600',
    cardBorder: 'border-blue-300 ring-2 ring-blue-400/30',
    lightBg: 'bg-blue-50/70',
    timeBadge: 'bg-blue-100 text-blue-900 border-blue-300',
    icon: Icons.LogOut,
  },
  absent: {
    label: '결석',
    badgeClass: 'bg-rose-600 text-white border-rose-700',
    cardBorder: 'border-rose-300 ring-2 ring-rose-400/30',
    lightBg: 'bg-rose-50/70',
    timeBadge: 'bg-rose-100 text-rose-900 border-rose-300',
    icon: Icons.XCircle,
  },
  none: {
    label: '미출석',
    badgeClass: 'bg-slate-200 text-slate-700 border-slate-300',
    cardBorder: 'border-slate-200 hover:border-slate-300',
    lightBg: 'bg-white',
    timeBadge: 'bg-slate-100 text-slate-400 border-slate-200',
    icon: Icons.Users,
  }
};

export default function App() {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [activeTab, setActiveTab] = useState('attendance');
  
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('attendance_students');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
  });

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('attendance_records');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedGroup, setSelectedGroup] = useState('전체');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({ name: '', group: '초등 A반', parentPhone: '', notes: '' });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('attendance_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('attendance_records', JSON.stringify(records));
  }, [records]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const groups = useMemo(() => {
    const set = new Set(students.map((s) => s.group));
    return ['전체', ...Array.from(set)];
  }, [students]);

  const currentDayRecords = records[selectedDate] || {};

  const handleStatusChange = (studentId, status, customTime = null) => {
    const now = new Date();
    const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setRecords((prev) => {
      const dayData = prev[selectedDate] || {};
      const currentStudentRecord = dayData[studentId] || {};

      const newStatus = currentStudentRecord.status === status && status !== 'none' ? 'none' : status;

      // 새로 지정된 시간 또는 기존 기록된 시간 적용
      let timeToSave = '';
      if (newStatus !== 'none') {
        timeToSave = customTime || currentStudentRecord.time || defaultTime;
      }

      const updatedDayData = {
        ...dayData,
        [studentId]: {
          status: newStatus,
          time: timeToSave,
          note: currentStudentRecord.note || ''
        }
      };

      return {
        ...prev,
        [selectedDate]: updatedDayData
      };
    });
  };

  // 터치 시 기본 출석 / 미출석 토글
  const handleStudentCardTap = (studentId) => {
    const currentStatus = currentDayRecords[studentId]?.status || 'none';
    if (currentStatus === 'present') {
      handleStatusChange(studentId, 'none');
    } else {
      handleStatusChange(studentId, 'present');
    }
  };

  // 개별 출석시간 직접 수정 핸들러
  const handleTimeEdit = (studentId, timeVal) => {
    const currentStatus = currentDayRecords[studentId]?.status || 'present';
    handleStatusChange(studentId, currentStatus, timeVal);
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name.trim()) {
      showToast('원생 이름을 입력해주세요.');
      return;
    }

    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...studentForm } : s));
      showToast(`${studentForm.name} 원생 정보가 수정되었습니다.`);
    } else {
      const newStudent = { id: Date.now(), ...studentForm };
      setStudents(prev => [...prev, newStudent]);
      showToast(`${studentForm.name} 원생이 등록되었습니다.`);
    }

    setIsModalOpen(false);
    setEditingStudent(null);
    setStudentForm({ name: '', group: '초등 A반', parentPhone: '', notes: '' });
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`${name} 원생을 삭제하시겠습니까?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      showToast(`${name} 원생이 삭제되었습니다.`);
    }
  };

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      group: student.group,
      parentPhone: student.parentPhone || '',
      notes: student.notes || ''
    });
    setIsModalOpen(true);
  };

  const stats = useMemo(() => {
    let present = 0, late = 0, early = 0, absent = 0, none = 0;

    students.forEach((s) => {
      const st = currentDayRecords[s.id]?.status || 'none';
      if (st === 'present') present++;
      else if (st === 'late') late++;
      else if (st === 'early') early++;
      else if (st === 'absent') absent++;
      else none++;
    });

    const total = students.length;
    const checked = present + late + early + absent;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return { total, present, late, early, absent, none, checked, rate };
  }, [students, currentDayRecords]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (selectedGroup !== '전체' && s.group !== selectedGroup) return false;
      const st = currentDayRecords[s.id]?.status || 'none';
      if (selectedStatusFilter !== '전체' && st !== selectedStatusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return s.name.toLowerCase().includes(q) || (s.notes && s.notes.toLowerCase().includes(q));
      }
      return true;
    });
  }, [students, selectedGroup, selectedStatusFilter, searchQuery, currentDayRecords]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <Icons.Sparkles />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              출
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">스마트 출석체크</h1>
              <p className="text-xs text-slate-500">원생 터치 한 번으로 출석 여부 & 출석 시간 즉시 확인</p>
            </div>
          </div>

          {/* Date Selector */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <Icons.Calendar />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer"
            />
            {selectedDate !== getTodayString() && (
              <button
                onClick={() => setSelectedDate(getTodayString())}
                className="text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-1 rounded-lg hover:bg-indigo-200 transition"
              >
                오늘로 이동
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex border-t border-slate-100 text-sm font-medium">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'attendance'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icons.CheckCircle />
            <span>오늘의 출석현황</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'students'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icons.Users />
            <span>원생 관리 ({students.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'messages'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icons.MessageSquare />
            <span>결석/지각 알림문자</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-medium text-slate-500">전체 원생</span>
                <div className="text-2xl font-bold text-slate-800 mt-1">{stats.total}<span className="text-xs text-slate-400 ml-1">명</span></div>
              </div>
              <div 
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'present' ? '전체' : 'present')}
                className={`p-4 rounded-2xl border shadow-sm transition cursor-pointer ${
                  selectedStatusFilter === 'present' ? 'ring-2 ring-emerald-500 bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-emerald-700">출석</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.present}<span className="text-xs text-emerald-400 ml-1">명</span></div>
              </div>
              <div 
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'late' ? '전체' : 'late')}
                className={`p-4 rounded-2xl border shadow-sm transition cursor-pointer ${
                  selectedStatusFilter === 'late' ? 'ring-2 ring-amber-500 bg-amber-50 border-amber-300' : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-amber-700">지각</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                </div>
                <div className="text-2xl font-bold text-amber-600 mt-1">{stats.late}<span className="text-xs text-amber-400 ml-1">명</span></div>
              </div>
              <div 
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'early' ? '전체' : 'early')}
                className={`p-4 rounded-2xl border shadow-sm transition cursor-pointer ${
                  selectedStatusFilter === 'early' ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-blue-700">조퇴</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-1">{stats.early}<span className="text-xs text-blue-400 ml-1">명</span></div>
              </div>
              <div 
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'absent' ? '전체' : 'absent')}
                className={`p-4 rounded-2xl border shadow-sm transition cursor-pointer ${
                  selectedStatusFilter === 'absent' ? 'ring-2 ring-rose-500 bg-rose-50 border-rose-300' : 'bg-white border-slate-200 hover:border-rose-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-rose-700">결석</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                </div>
                <div className="text-2xl font-bold text-rose-600 mt-1">{stats.absent}<span className="text-xs text-rose-400 ml-1">명</span></div>
              </div>
              <div 
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'none' ? '전체' : 'none')}
                className={`p-4 rounded-2xl border shadow-sm transition cursor-pointer ${
                  selectedStatusFilter === 'none' ? 'ring-2 ring-slate-400 bg-slate-100 border-slate-300' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-500">미체크</span>
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                </div>
                <div className="text-2xl font-bold text-slate-600 mt-1">{stats.none}<span className="text-xs text-slate-400 ml-1">명</span></div>
              </div>
            </div>

            {/* Filters Bar & Batch Actions */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">반:</span>
                {groups.map((group) => (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                      selectedGroup === group
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1 sm:w-48">
                  <input
                    type="text"
                    placeholder="이름 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 rounded-xl border border-transparent focus:border-indigo-400 focus:bg-white outline-none transition"
                  />
                  <div className="absolute left-2.5 top-2 text-slate-400">
                    <Icons.Search />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('현재 목록의 미체크 원생을 모두 [출석] 처리할까요?')) {
                      filteredStudents.forEach((s) => {
                        if (!currentDayRecords[s.id] || currentDayRecords[s.id].status === 'none') {
                          handleStatusChange(s.id, 'present');
                        }
                      });
                      showToast('전체 출석 처리가 완료되었습니다.');
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition shrink-0"
                >
                  전체 출석
                </button>
              </div>
            </div>

            {/* Helper Banner */}
            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center justify-between text-xs text-indigo-900">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-md font-semibold text-[10px]">안내</span>
                <span>원생 카드를 터치하면 즉시 <strong>[출석 완료 / 미출석]</strong> 토글이 이루어지며 <strong>출석 시각</strong>이 자동 기록됩니다.</span>
              </div>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-400 text-sm">해당 조건의 원생이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStudents.map((student) => {
                  const record = currentDayRecords[student.id] || { status: 'none', time: '', note: '' };
                  const statusInfo = STATUS_CONFIG[record.status] || STATUS_CONFIG.none;
                  const IconComp = statusInfo.icon;
                  const isCheckedIn = record.status !== 'none';

                  return (
                    <div
                      key={student.id}
                      className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${statusInfo.cardBorder}`}
                    >
                      {/* Main Card Content Area (Click to Toggle Attendance) */}
                      <div
                        onClick={() => handleStudentCardTap(student.id)}
                        className={`p-4 cursor-pointer select-none transition flex-1 flex flex-col justify-between ${statusInfo.lightBg}`}
                      >
                        {/* Card Header: Group & Student Name */}
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-slate-400">
                              {student.group}
                            </span>
                            
                            {/* Status Badge */}
                            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm border ${statusInfo.badgeClass}`}>
                              <IconComp />
                              <span>{statusInfo.label}</span>
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mt-1">{student.name}</h3>
                        </div>

                        {/* Prominent Attendance Time Display Area */}
                        <div className="my-4 py-3 px-3 rounded-xl border flex flex-col items-center justify-center text-center transition bg-white/90 backdrop-blur-sm shadow-inner">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                            {isCheckedIn ? '출석 기록 시간' : '출석 상태'}
                          </span>
                          
                          {isCheckedIn ? (
                            <div className="flex items-center space-x-1.5 text-slate-800">
                              <span className="text-amber-500"><Icons.Clock /></span>
                              <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                                {record.time || '--:--'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-slate-400 py-1">
                              미출석 (터치시 출석)
                            </span>
                          )}
                        </div>

                        {/* Note Subtext if exists */}
                        {student.notes && (
                          <div className="text-[11px] text-slate-500 truncate bg-slate-100/70 px-2 py-1 rounded-md">
                            💡 {student.notes}
                          </div>
                        )}
                      </div>

                      {/* Time Direct Modifier & Status Quick Selectors */}
                      <div className="border-t border-slate-100 bg-slate-50 p-2 flex items-center justify-between gap-1 text-xs">
                        {/* Time Input Field */}
                        <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
                          <span className="text-slate-400 text-[10px] font-medium">시간:</span>
                          <input
                            type="time"
                            value={record.time || ''}
                            onChange={(e) => handleTimeEdit(student.id, e.target.value)}
                            disabled={!isCheckedIn}
                            className={`bg-transparent text-xs font-mono font-bold outline-none cursor-pointer ${
                              isCheckedIn ? 'text-slate-800' : 'text-slate-300'
                            }`}
                          />
                        </div>

                        {/* Quick Status Buttons */}
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleStatusChange(student.id, 'present')}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                              record.status === 'present' ? 'bg-emerald-600 text-white' : 'bg-white border text-emerald-700 hover:bg-emerald-50'
                            }`}
                          >
                            출석
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'late')}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                              record.status === 'late' ? 'bg-amber-500 text-white' : 'bg-white border text-amber-700 hover:bg-amber-50'
                            }`}
                          >
                            지각
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, 'absent')}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                              record.status === 'absent' ? 'bg-rose-600 text-white' : 'bg-white border text-rose-700 hover:bg-rose-50'
                            }`}
                          >
                            결석
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900">원생 명단 및 정보 관리</h2>
                <p className="text-xs text-slate-500">원생 추가/수정, 반 배정 및 학부모 연락처를 관리하세요.</p>
              </div>
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setStudentForm({ name: '', group: '초등 A반', parentPhone: '', notes: '' });
                  setIsModalOpen(true);
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow flex items-center space-x-2 transition"
              >
                <Icons.UserPlus />
                <span>새 원생 등록</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">이름</th>
                      <th className="px-4 py-3">소속 반</th>
                      <th className="px-4 py-3">오늘 출석시간</th>
                      <th className="px-4 py-3">학부모 연락처</th>
                      <th className="px-4 py-3">메모</th>
                      <th className="px-4 py-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => {
                      const rec = currentDayRecords[student.id];
                      return (
                        <tr key={student.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-4 py-3.5 font-bold text-slate-900">{student.name}</td>
                          <td className="px-4 py-3.5">
                            <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                              {student.group}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            {rec && rec.time ? (
                              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
                                ⏰ {rec.time} ({STATUS_CONFIG[rec.status]?.label})
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 font-mono text-xs">{student.parentPhone || '-'}</td>
                          <td className="px-4 py-3.5 text-xs text-slate-500">{student.notes || '-'}</td>
                          <td className="px-4 py-3.5 text-right space-x-1">
                            <button
                              onClick={() => handleOpenEditModal(student)}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                              title="수정"
                            >
                              <Icons.Edit />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id, student.name)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="삭제"
                            >
                              <Icons.Trash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">결석 및 지각 원생 알림 문자 생성기</h2>
              <p className="text-xs text-slate-500 mt-1">오늘({selectedDate}) 기록된 결석/지각 학생 학부모 알림문구를 원클릭 복사할 수 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Absent List */}
              <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-rose-700 flex items-center space-x-2">
                    <Icons.XCircle />
                    <span>결석 알림 명단</span>
                  </h3>
                  <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                    {students.filter(s => currentDayRecords[s.id]?.status === 'absent').length}명
                  </span>
                </div>

                <div className="space-y-3">
                  {students
                    .filter(s => currentDayRecords[s.id]?.status === 'absent')
                    .map(student => {
                      const msg = `[학원 알림] 안녕하세요, ${student.name} 학생 학부모님. 오늘(${selectedDate}) ${student.name} 학생이 출석하지 않아 확인차 연락드립니다.`;
                      return (
                        <div key={student.id} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-xs space-y-2">
                          <div className="flex justify-between font-bold text-slate-800">
                            <span>{student.name} ({student.parentPhone || '연락처 미등록'})</span>
                          </div>
                          <p className="text-slate-600 bg-white p-2 rounded border border-rose-100 leading-relaxed">
                            {msg}
                          </p>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(msg);
                              showToast(`${student.name} 학생 알림 문구가 복사되었습니다.`);
                            }}
                            className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg flex items-center justify-center space-x-1 transition text-xs"
                          >
                            <Icons.Copy />
                            <span>문구 복사하기</span>
                          </button>
                        </div>
                      );
                    })}

                  {students.filter(s => currentDayRecords[s.id]?.status === 'absent').length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">오늘 결석 원생이 없습니다.</p>
                  )}
                </div>
              </div>

              {/* Late List */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-700 flex items-center space-x-2">
                    <Icons.Clock />
                    <span>지각 알림 명단</span>
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    {students.filter(s => currentDayRecords[s.id]?.status === 'late').length}명
                  </span>
                </div>

                <div className="space-y-3">
                  {students
                    .filter(s => currentDayRecords[s.id]?.status === 'late')
                    .map(student => {
                      const rec = currentDayRecords[student.id];
                      const msg = `[학원 알림] 안녕하세요. ${student.name} 학생이 오늘(${selectedDate}) ${rec.time || '지각'}에 학원에 도착하였습니다.`;
                      return (
                        <div key={student.id} className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-xs space-y-2">
                          <div className="flex justify-between font-bold text-slate-800">
                            <span>{student.name} ({student.parentPhone || '연락처 미등록'})</span>
                            <span className="text-amber-700 font-mono">⏰ {rec.time} 도착</span>
                          </div>
                          <p className="text-slate-600 bg-white p-2 rounded border border-amber-100 leading-relaxed">
                            {msg}
                          </p>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(msg);
                              showToast(`${student.name} 학생 지각 알림 문구가 복사되었습니다.`);
                            }}
                            className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg flex items-center justify-center space-x-1 transition text-xs"
                          >
                            <Icons.Copy />
                            <span>문구 복사하기</span>
                          </button>
                        </div>
                      );
                    })}

                  {students.filter(s => currentDayRecords[s.id]?.status === 'late').length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">오늘 지각 원생이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Student Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">
                {editingStudent ? '원생 정보 수정' : '새 원생 등록'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">원생 이름 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">소속 반 / 그룹</label>
                <input
                  type="text"
                  placeholder="예: 초등 A반, 중등 수학반 등"
                  value={studentForm.group}
                  onChange={(e) => setStudentForm({ ...studentForm, group: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">학부모 연락처</label>
                <input
                  type="text"
                  placeholder="010-0000-0000"
                  value={studentForm.parentPhone}
                  onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">특이사항 / 메모</label>
                <textarea
                  placeholder="차량 노선, 수강 요일 등"
                  rows="3"
                  value={studentForm.notes}
                  onChange={(e) => setStudentForm({ ...studentForm, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow transition"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}