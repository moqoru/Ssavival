package com.oguogu.m59s.controller;

import com.oguogu.m59s.model.dto.ChatGptResponseDto;
import com.oguogu.m59s.model.dto.QuestionRequestDto;
import com.oguogu.m59s.model.service.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat-gpt")
@CrossOrigin(origins = "*")
public class ChatGptController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    ChatGptService chatGptService;

    @PostMapping("/question")
    public ResponseEntity<Map<String, Object>> sendQuestion(@RequestBody QuestionRequestDto requestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        List<String> wordList = new ArrayList<>();

        //정답 단어 추출
        requestDto.setQuestion(requestDto.getQuestion()+"와 관련된 무작위 단어 하나를 알려줘");
        ChatGptResponseDto chatGptResponseDto = chatGptService.askQuestion(requestDto);

        //정답 단어 유추 가능 리스트 추출
        QuestionRequestDto question = new QuestionRequestDto();
        question.setQuestion(requestDto.getQuestion() + "분야에서 " + chatGptResponseDto.getChoices().get(0).getText()+"를 연상시킬 수 있는 단어를 5개 알려줘");
        ChatGptResponseDto chatGptResponseDtoList = chatGptService.askQuestion(question);


        //단어 리스트 정제
        String[] ingredients = chatGptResponseDtoList.getChoices().get(0).getText().trim().split("[\n,]"); // 줄바꿈 문자('\n')를 기준으로 문자열을 나누어 배열에 저장
        for (int i = 0; i < ingredients.length; i++) {
            if(ingredients[i].equals(" ") || ingredients[i].equals(".") || ingredients[i].equals("") || ingredients[i].equals("면")) continue;
            String word = ingredients[i].trim();
//            if(word.equals(" ") || word.equals(".")) continue;
            wordList.add(word);
        }

        resultMap.put("result",SUCCESS);
        resultMap.put("answer",chatGptResponseDto);
        resultMap.put("wordList", wordList);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}