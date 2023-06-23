package com.oguogu.m59s.controller;

import com.oguogu.m59s.entity.MiniGame;
import com.oguogu.m59s.model.S3FileUploadService;
import com.oguogu.m59s.model.dto.*;
import com.oguogu.m59s.model.service.GameService;
import com.oguogu.m59s.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameRestController {
    @Autowired
    GameService gameService;
    @Autowired
    UserService userService;
    @Autowired
    S3FileUploadService s3FileUploadService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    // @GetMapping("/{userId}")
    // public ResponseEntity<Map<String, Object>> MiniGameList(@PathVariable long
    // userId){
    // //해당 유저의 최고기록에 해당하는 gameId 가져오기(정렬이 되어있기 때문에 제일 위에꺼를 가져가면 최고점)
    // GameDto gameDto = gameService.listGame(userId).get(0);
    //
    // //gameId를 기반으로 게임 정보 가져오기
    // long gameId = gameDto.getGameId();
    //
    // List<MiniGameInfoDto> miniGameInfoDtoList = gameService.listMiniGame(gameId);
    // Map<String, Object> resultMap = new HashMap<>();
    // resultMap.put("result",SUCCESS);
    // resultMap.put("miniGameInfoList",miniGameInfoDtoList);
    //
    // return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    // }

    @PostMapping("/done")
    public ResponseEntity<Map<String, Object>> gameInfoSave(@RequestPart(value = "miniGame") MiniGameDto miniGameDto,
            @RequestParam(value = "gameImages") List<MultipartFile> multipartFiles) throws Exception {
        // public ResponseEntity<Map<String, Object>> gameInfoSave(@RequestBody
        // MiniGameDto miniGameDto, @RequestPart(value = "profile",required = false)
        // MultipartFile[] multipartFiles) throws Exception{
        // long miniGameId = miniGameDto.getMiniGameId();
        // System.out.println("minidto가 잘 들어오는지 보자.");
        // System.out.println(miniGameDto.getMiniGameDetail().getMiniGameDetailId());
        // System.out.println(miniGameDto.getGameId());
        // System.out.println(miniGameDto.getMiniGameId());
        // System.out.println("MINGAME "+miniGameDto);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        if (multipartFiles != null) {
            gameService.saveMiniGame(miniGameDto);
            resultMap.put("miniGameDto", miniGameDto);
            long miniGameLastIndex = gameService.findMiniGameLastIndex();
            System.out.println("miniGameLastIndex " + miniGameLastIndex);
            for (int i = 0; i < multipartFiles.size(); i++) {
                GameImageDto gameImageDto = new GameImageDto();
                gameImageDto.setMiniGameId(miniGameLastIndex);
                System.out.println("CCCCCCCCCCCCCCCCCCCCCCC " + gameImageDto.getMiniGameId());
                gameImageDto.setImageUrl(s3FileUploadService.upload(multipartFiles.get(i)));
                gameService.saveGameImage(gameImageDto);
            }
            // miniGameDto
            // int len = multipartFiles.length;
            // for(int i=0;i<len;i++){
            // GameImageDto gameImageDto = new GameImageDto();
            // gameImageDto.setImageUrl(s3FileUploadService.upload(multipartFiles[i]));
            // gameImageDto.setRound(i+1);
            // setMiniGameId(miniGameDto.getMiniGameDetailId());
            // }

        }
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/final/done")
    public ResponseEntity<Map<String, Object>> gameFinalInfoSave(@RequestBody GameDto gameDto) {
        gameService.updateGame(gameDto);
        userService.updateUser(gameDto);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/multi/{userId}/{round}")
    public ResponseEntity<Map<String, Object>> startMiniGame(@PathVariable("userId") long userId,
            @PathVariable("round") int round) {
        GameDto gameDto = gameService.listGame(userId).get(0);
        System.out.println("GAMEDTO : " + gameDto);
        long gameId = gameDto.getGameId();
        System.out.println("GAMEID : " + gameId);
        List<MiniGameInfoDto> miniGameInfoDtoList = gameService.listMiniGame(gameId);
        MiniGameInfoDto miniGameInfoDto = miniGameInfoDtoList.get(round - 1);
        System.out.println("MINIGAMEINFODTO : " + miniGameInfoDto);
        long miniGameId = miniGameInfoDto.getMiniGameId();
        System.out.println("MINIGAMEID : " + miniGameId);
        List<GameImageDto> gameImageDtoList = gameService.listGameImage(miniGameId);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        resultMap.put("gameImages", gameImageDtoList);
        resultMap.put("miniGame", miniGameInfoDto);
        // resultMap.put("gameId",gameId);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/start/{userId}")
    public ResponseEntity<Map<String, Object>> startGame(@PathVariable long userId) {
        GameDto gameDto = new GameDto(0, 0, 0, 0, 0, new Date(), userId);
        gameService.saveGame(gameDto);
        long gameId = gameService.findGameLastIndex() - 1;
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        resultMap.put("gameId", gameId);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }
}
