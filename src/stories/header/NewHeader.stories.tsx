import type { Meta, StoryObj } from '@storybook/react';
import SemisHeader from '../../components/header/semis';

const program = {
    "programStages": [
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "Academic Year ",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "2024",
                                    "label": "2024"
                                },
                                {
                                    "value": "2023",
                                    "label": "2023"
                                },
                                {
                                    "value": "2022",
                                    "label": "2022"
                                },
                                {
                                    "value": "2021",
                                    "label": "2021"
                                },
                                {
                                    "value": "2025",
                                    "label": "2025"
                                }
                            ]
                        },
                        "displayName": "Academic Year ",
                        "id": "iDSrFrrVgmX"
                    },
                    "compulsory": true,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Grade",
                        "formName": "Grade",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Grade 1",
                                    "label": "Grade 1"
                                },
                                {
                                    "value": "Grade 2",
                                    "label": "Grade 2"
                                },
                                {
                                    "value": "Grade 3",
                                    "label": "Grade 3"
                                },
                                {
                                    "value": "Grade 4",
                                    "label": "Grade 4"
                                },
                                {
                                    "value": "Grade 5",
                                    "label": "Grade 5"
                                },
                                {
                                    "value": "Grade 6",
                                    "label": "Grade 6"
                                },
                                {
                                    "value": "Grade 7",
                                    "label": "Grade 7"
                                },
                                {
                                    "value": "Grade 8",
                                    "label": "Grade 8"
                                },
                                {
                                    "value": "Grade 9",
                                    "label": "Grade 9"
                                },
                                {
                                    "value": "Grade 10",
                                    "label": "Grade 10"
                                },
                                {
                                    "value": "Grade 11",
                                    "label": "Grade 11"
                                },
                                {
                                    "value": "Grade 12",
                                    "label": "Grade 12"
                                }
                            ]
                        },
                        "displayName": "Grade",
                        "id": "kNNoif9gASf"
                    },
                    "compulsory": true,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Class/Section",
                        "formName": "Class/Section",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Not defined",
                                    "label": "Not defined"
                                },
                                {
                                    "value": "A",
                                    "label": "A"
                                },
                                {
                                    "value": "B",
                                    "label": "B"
                                },
                                {
                                    "value": "C",
                                    "label": "C"
                                },
                                {
                                    "value": "D",
                                    "label": "D"
                                },
                                {
                                    "value": "E",
                                    "label": "E"
                                },
                                {
                                    "value": "F",
                                    "label": "F"
                                }
                            ]
                        },
                        "displayName": "Class/Section",
                        "id": "RhABRLO2Fae"
                    },
                    "compulsory": true,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Enrollment details",
            "id": "Ni2qsy2WJn4",
            "repeatable": false
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "Electricity in students house",
                        "formName": "Do you have electricity in your house ?",
                        "valueType": "TRUE_ONLY",
                        "displayName": "Electricity in students house",
                        "id": "sLeCSA4UMe5"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Talents",
                        "formName": "Talents?",
                        "valueType": "TEXT",
                        "displayName": "Talents",
                        "id": "UgCcMc10Dsw"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Floor of the room in which students sleep",
                        "formName": "What material are the floor of the room in which you sleep?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "earth",
                                    "label": "Earth/mud"
                                },
                                {
                                    "value": "wood",
                                    "label": "Wood"
                                },
                                {
                                    "value": "stone",
                                    "label": "Stone/brick"
                                },
                                {
                                    "value": "cement",
                                    "label": "Cement/ concrete/tiles"
                                },
                                {
                                    "value": "other",
                                    "label": "Other"
                                },
                                {
                                    "value": "do not know",
                                    "label": "Don’t Know"
                                }
                            ]
                        },
                        "displayName": "Floor of the room in which students sleep",
                        "id": "JIk5YtcFt7b"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have Sickle Cell Anaemia?",
                        "valueType": "BOOLEAN",
                        "displayName": "Do you have Sickle Cell Anaemia?",
                        "id": "pCZgMl3RgiC"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have any other health issue?",
                        "valueType": "TEXT",
                        "displayName": "Do you have any other health issue?",
                        "id": "vpAkX5dHhx8"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have difficulty (with self-care such as) washing all over or dressing?",
                        "formName": "Do you have difficulty (with self-care such as) washing all over or dressing?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Yes, a lot of difficulty ",
                                    "label": "Yes, a lot of difficulty "
                                },
                                {
                                    "value": "Cannot do it at all ",
                                    "label": "Cannot do it at all "
                                },
                                {
                                    "value": "No, no difficulty",
                                    "label": "No, no difficulty"
                                },
                                {
                                    "value": "Yes, some difficulty",
                                    "label": "Yes, some difficulty"
                                }
                            ]
                        },
                        "displayName": "Do you have difficulty (with self-care such as) washing all over or dressing?",
                        "id": "RFLVyp90ITL"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Living with parents",
                        "formName": "Are you living with your parents?",
                        "valueType": "BOOLEAN",
                        "displayName": "Living with parents",
                        "id": "JDODlu9eDSe"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have difficulty hearing, even if using a hearing aid?",
                        "formName": "Do you have difficulty hearing, even if using a hearing aid?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Yes, a lot of difficulty ",
                                    "label": "Yes, a lot of difficulty "
                                },
                                {
                                    "value": "Cannot do it at all ",
                                    "label": "Cannot do it at all "
                                },
                                {
                                    "value": "No, no difficulty",
                                    "label": "No, no difficulty"
                                },
                                {
                                    "value": "Yes, some difficulty",
                                    "label": "Yes, some difficulty"
                                }
                            ]
                        },
                        "displayName": "Do you have difficulty hearing, even if using a hearing aid?",
                        "id": "FZZNRD0FCGF"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Means of travel to school",
                        "formName": "How did you travel to school?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "walk",
                                    "label": "walk"
                                },
                                {
                                    "value": "bicycle",
                                    "label": "bicycle"
                                },
                                {
                                    "value": "personal vehicle",
                                    "label": "personal vehicle"
                                },
                                {
                                    "value": "public transportation",
                                    "label": "public transportation"
                                },
                                {
                                    "value": "horse cart",
                                    "label": "Horse/donkey cart"
                                }
                            ]
                        },
                        "displayName": "Means of travel to school",
                        "id": "pmnNFDUEmwT"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have difficulty remembering or concentrating?",
                        "formName": "Do you have difficulty remembering or concentrating?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Yes, a lot of difficulty ",
                                    "label": "Yes, a lot of difficulty "
                                },
                                {
                                    "value": "Cannot do it at all ",
                                    "label": "Cannot do it at all "
                                },
                                {
                                    "value": "No, no difficulty",
                                    "label": "No, no difficulty"
                                },
                                {
                                    "value": "Yes, some difficulty",
                                    "label": "Yes, some difficulty"
                                }
                            ]
                        },
                        "displayName": "Do you have difficulty remembering or concentrating?",
                        "id": "oLxYfrjR6B5"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "LI6a - General bursary information: Receives bursary",
                        "formName": "General bursary information: Receives bursary",
                        "valueType": "BOOLEAN",
                        "displayName": "LI6a - General bursary information: Receives bursary",
                        "id": "SjMxl9Cwha8"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have difficulty seeing, even if wearing glasses?",
                        "formName": "Do you have difficulty seeing, even if wearing glasses?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Yes, a lot of difficulty ",
                                    "label": "Yes, a lot of difficulty "
                                },
                                {
                                    "value": "Cannot do it at all ",
                                    "label": "Cannot do it at all "
                                },
                                {
                                    "value": "No, no difficulty",
                                    "label": "No, no difficulty"
                                },
                                {
                                    "value": "Yes, some difficulty",
                                    "label": "Yes, some difficulty"
                                }
                            ]
                        },
                        "displayName": "Do you have difficulty seeing, even if wearing glasses?",
                        "id": "HDrb9f7Ndpp"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "LI6b - General bursary information: Source(s) of bursary",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Government",
                                    "label": "Government"
                                },
                                {
                                    "value": "International Scholarship",
                                    "label": "International Scholarship"
                                },
                                {
                                    "value": "Local Scholarship",
                                    "label": "Local Scholarship"
                                },
                                {
                                    "value": "National Board",
                                    "label": "National Board"
                                },
                                {
                                    "value": "Private",
                                    "label": "Private"
                                },
                                {
                                    "value": "Others",
                                    "label": "Others"
                                }
                            ]
                        },
                        "displayName": "LI6b - General bursary information: Source(s) of bursary",
                        "id": "H12Bz9ilOf1"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Do you have difficulty walking or climbing steps?",
                        "formName": "Do you have difficulty walking or climbing steps?",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Yes, a lot of difficulty ",
                                    "label": "Yes, a lot of difficulty "
                                },
                                {
                                    "value": "Cannot do it at all ",
                                    "label": "Cannot do it at all "
                                },
                                {
                                    "value": "No, no difficulty",
                                    "label": "No, no difficulty"
                                },
                                {
                                    "value": "Yes, some difficulty",
                                    "label": "Yes, some difficulty"
                                }
                            ]
                        },
                        "displayName": "Do you have difficulty walking or climbing steps?",
                        "id": "k7z0gfAvLkA"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "LI6c - General bursary information: Amount in SZL of bursary per year",
                        "formName": "Amount in SZL of bursary per year",
                        "valueType": "NUMBER",
                        "displayName": "LI6c - General bursary information: Amount in SZL of bursary per year",
                        "id": "wsFrk0eBZgi"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "LI6d - Amount in SZL of bursary for School fees",
                        "valueType": "INTEGER_ZERO_OR_POSITIVE",
                        "displayName": "LI6d - Amount in SZL of bursary for School fees",
                        "id": "DXg4BfI9BQx"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "LI6e - Amount in SZL of bursary for Examination fees",
                        "valueType": "INTEGER_ZERO_OR_POSITIVE",
                        "displayName": "LI6e - Amount in SZL of bursary for Examination fees",
                        "id": "woYJkG3KMga"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "LI6f - Amount in SZL of bursary for others (Others)",
                        "valueType": "INTEGER_ZERO_OR_POSITIVE",
                        "displayName": "LI6f - Amount in SZL of bursary for others (Others)",
                        "id": "QRl2YSQXsYr"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Health Issues?",
                        "formName": "Health Issues?",
                        "valueType": "TEXT",
                        "displayName": "Health Issues?",
                        "id": "ReiryBkZcCT"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Special needs?",
                        "formName": "Special needs?",
                        "valueType": "TEXT",
                        "displayName": "Special needs?",
                        "id": "xOiyqnsPZS7"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Practical skills",
                        "formName": "Practical skills?",
                        "valueType": "TEXT",
                        "displayName": "Practical skills",
                        "id": "sImY1RsfcWN"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Student Levy",
                        "formName": "Student Levy",
                        "valueType": "NUMBER",
                        "displayName": "Student Levy",
                        "id": "OsXzFxuvQqy"
                    },
                    "compulsory": false,
                    "displayInReports": false
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Socio-economics",
            "id": "Wi3KEZ7C3w9",
            "repeatable": false
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "Attendance",
                        "formName": "Attendance status",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "present",
                                    "label": "Present"
                                },
                                {
                                    "value": "late",
                                    "label": "Late"
                                },
                                {
                                    "value": "absent",
                                    "label": "Absent"
                                }
                            ]
                        },
                        "displayName": "Attendance",
                        "id": "d0MKWRNGv0a"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Reason of absence",
                        "formName": "Reason of absence",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "SICK",
                                    "label": "Sick"
                                },
                                {
                                    "value": "OTHER REASON",
                                    "label": "Other reason"
                                }
                            ]
                        },
                        "displayName": "Reason of absence",
                        "id": "oLUMMT84ILM"
                    },
                    "compulsory": false,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Attendance",
            "id": "Ljyrr3cktAr",
            "repeatable": true
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "English language",
                        "formName": "English language",
                        "valueType": "NUMBER",
                        "displayName": "English language",
                        "id": "mMiLYGJJ78I"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Mathematics",
                        "formName": "Mathematics",
                        "valueType": "NUMBER",
                        "displayName": "Mathematics",
                        "id": "qPwGZal50yH"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Science",
                        "formName": "Science",
                        "valueType": "NUMBER",
                        "displayName": "Science",
                        "id": "w75mLLmHYyS"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "History",
                        "formName": "History",
                        "valueType": "NUMBER",
                        "displayName": "History",
                        "id": "cTTpaVY6m1Q"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Visual arts",
                        "formName": "Visual arts",
                        "valueType": "NUMBER",
                        "displayName": "Visual arts",
                        "id": "HFjLxmmXm7t"
                    },
                    "compulsory": false,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Term 1",
            "id": "mBEhR2M4DRQ",
            "repeatable": false
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "English language",
                        "formName": "English language",
                        "valueType": "NUMBER",
                        "displayName": "English language",
                        "id": "mMiLYGJJ78I"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Mathematics",
                        "formName": "Mathematics",
                        "valueType": "NUMBER",
                        "displayName": "Mathematics",
                        "id": "qPwGZal50yH"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Science",
                        "formName": "Science",
                        "valueType": "NUMBER",
                        "displayName": "Science",
                        "id": "w75mLLmHYyS"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "History",
                        "formName": "History",
                        "valueType": "NUMBER",
                        "displayName": "History",
                        "id": "cTTpaVY6m1Q"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Visual arts",
                        "formName": "Visual arts",
                        "valueType": "NUMBER",
                        "displayName": "Visual arts",
                        "id": "HFjLxmmXm7t"
                    },
                    "compulsory": false,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Term 2",
            "id": "aDmsN3qemOA",
            "repeatable": false
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "English language",
                        "formName": "English language",
                        "valueType": "NUMBER",
                        "displayName": "English language",
                        "id": "mMiLYGJJ78I"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Mathematics",
                        "formName": "Mathematics",
                        "valueType": "NUMBER",
                        "displayName": "Mathematics",
                        "id": "qPwGZal50yH"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Science",
                        "formName": "Science",
                        "valueType": "NUMBER",
                        "displayName": "Science",
                        "id": "w75mLLmHYyS"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "History",
                        "formName": "History",
                        "valueType": "NUMBER",
                        "displayName": "History",
                        "id": "cTTpaVY6m1Q"
                    },
                    "compulsory": false,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Term 3",
            "id": "rZGdcch2PCh",
            "repeatable": false
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "Final decision",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Promoted",
                                    "label": "Promoted"
                                },
                                {
                                    "value": "Failed",
                                    "label": "Failed"
                                },
                                {
                                    "value": "Dropout",
                                    "label": "Dropout"
                                }
                            ]
                        },
                        "displayName": "Final decision",
                        "id": "bsyU0WFfskG"
                    },
                    "compulsory": false,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Final result",
            "id": "hcrjYJ6Yl5F",
            "repeatable": false
        },
        {
            "programStageDataElements": [
                {
                    "dataElement": {
                        "name": "Destiny School (Transfer)",
                        "formName": "Destiny School",
                        "valueType": "ORGANISATION_UNIT",
                        "displayName": "Destiny School (Transfer)",
                        "id": "kQbquG7UivM"
                    },
                    "compulsory": false,
                    "displayInReports": true
                },
                {
                    "dataElement": {
                        "name": "Reason for transfer",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Change of residence",
                                    "label": "Change of residence"
                                },
                                {
                                    "value": "Health challenges",
                                    "label": "Health challenges"
                                },
                                {
                                    "value": "Quality of education",
                                    "label": "Quality of education"
                                },
                                {
                                    "value": "Financial hardships",
                                    "label": "Financial hardships"
                                },
                                {
                                    "value": "Other",
                                    "label": "Other"
                                }
                            ]
                        },
                        "displayName": "Reason for transfer",
                        "id": "ZdFo5gthBt2"
                    },
                    "compulsory": false,
                    "displayInReports": false
                },
                {
                    "dataElement": {
                        "name": "Transfer Status",
                        "valueType": "TEXT",
                        "optionSet": {
                            "options": [
                                {
                                    "value": "Pending",
                                    "label": "Pending"
                                },
                                {
                                    "value": "Approved",
                                    "label": "Approved"
                                },
                                {
                                    "value": "Reproved",
                                    "label": "Rejected"
                                },
                                {
                                    "value": "Cancelled",
                                    "label": "Cancelled"
                                }
                            ]
                        },
                        "displayName": "Transfer Status",
                        "id": "YnwITieplwy"
                    },
                    "compulsory": false,
                    "displayInReports": true
                }
            ],
            "autoGenerateEvent": false,
            "displayName": "Transfer",
            "id": "uewAr6TmLkw",
            "repeatable": true
        }
    ]
}


const meta = {
    title: 'Header/Semis New',
    component: SemisHeader,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
    },
} satisfies Meta<typeof SemisHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemisOne: Story = {
    args: {
        program: program,
        headerItems: {
            academicYears: {
                options: [
                    {
                        label: "2024",
                        value: "2024",
                    },
                    {
                        label: "2023",
                        value: "2023",
                    },
                    {
                        label: "2022",
                        value: "2022",
                    },
                ]
            },
            showOuTree: false,
            otherItems: [
                {
                    label: "Grade",
                    placehoder: "Search for a grade",
                    ulrParam: "grade",
                    isSeachable: true,
                    position: "LEFT",
                    dataElelemt:"RhABRLO2Fae"
                }
            ]
        }
    },
};